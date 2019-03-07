import {Events, EventBus, Event} from "../events";
import IContentProvider, { IScriptLoader } from "./IContentProvider";

import scriptLoader from "../util/NodeScriptLoader";
/*import * as tsNode from "ts-node";
tsNode.register({
  compilerOptions:
    noImplicitAny: false,
  },
});
/* TODO:if (this.window === this )
import scriptLoader from "../util/BrowserScriptLoader";*/

const LOADING_BUS = new EventBus();

LOADING_BUS.registerEvent(Events.registerSystem);
LOADING_BUS.registerEvent(Events.registerComponent);
LOADING_BUS.registerEvent(Events.registerTemplate);

const evt = new Event<{name:string, id: number}, string>("evt");

async function loadContentProviders() {
  let contentProviders: Array<IContentProvider>;
  try {
    contentProviders = await scriptLoader.loadFromDir("providers", /^cp_(\w+)\.[tj]s$/i);
    console.log("Loadeded ContentProviders:", contentProviders);
    await Promise.all(contentProviders.filter((cp, i) => cp.init).map((cp) => cp.init!(LOADING_BUS)));
  } catch(err) {
    console.error("ERROR!\n", err);
  }

  let [systems, components, templates] = await Promise.all([
    Events.registerSystem.emit(null),
    Events.registerComponent.emit(null),
    Events.registerTemplate.emit(null),
  ]);

  console.log(`LOADED:
  Systems:\t${systems}
  Components:\t${components}
  Templates:\t${templates}`);
}

loadContentProviders();
