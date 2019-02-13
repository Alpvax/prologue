import EventBus, {Event} from "../util/AsyncEventBus";
import IContentProvider, { IScriptLoader } from "./IContentProvider";

import scriptLoader from "../util/NodeScriptLoader";
/* TODO:if (this.window === this )
import scriptLoader from "../util/BrowserScriptLoader";*/

const LOADING_BUS = new EventBus();

const registryEvents = {
  system: new Event<void, any>("register_system"),
  component: new Event<void, any>("register_component"),
  template: new Event<void, any>("register_template"),
};

Object.values(registryEvents).forEach((e) => LOADING_BUS.registerEvent(e));

async function loadContentProviders() {
  let contentProviders: Array<IContentProvider> = await scriptLoader.loadFromDir("../../providers", /cp_(\w+)\.[tj]s/i);
  await Promise.all(contentProviders.filter((cp) => cp.init).map((cp) => cp.init!(LOADING_BUS)));

  let [systems, components, templates] = await Promise.all([
    registryEvents.system.emit(),
    registryEvents.component.emit(),
    registryEvents.template.emit(),
  ]);

  console.log(`LOADED:
  Systems:\t${systems}
  Components:\t${components}
  Templates:\t${templates}`);
}

loadContentProviders();
