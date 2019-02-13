import {Component, ComponentDB} from "./Component";

interface EntityTemplate {
  readonly name: string;
  readonly components: Array<ComponentTemplate>;
}

export type ComponentTemplate = () => Component;

function createComponentTemplate(component: string, data: any): ComponentTemplate {
  let comp = ComponentDB.get(component);
  if (!comp) {
    throw new Error("Invalid Template!\nNo component registered: " + component);
  }
  return comp.buildTemplate(data);
}

export default function createTemplate(name: string, data: object): EntityTemplate {
  return Object.entries(data).reduce((temp, {cname, cdata}) => {
    temp.components.push(createComponentTemplate(cname, cdata));
  }, {
    name: name,
    components: []
  });
}
