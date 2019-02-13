import {Entity} from "./GameObjectManager";
import {ComponentTemplate} from "./Template"

interface IComponent {}
const Component: ComponentConstructor = class Component implements IComponent{
  constructor(name: string) {
    ComponentDB.set(name, <ComponentConstructor>this.constructor)
  }
  static buildTemplate(templateDefinition: any): ComponentTemplate {

  }
}
export default Component;

interface ComponentConstructor {
  new (name: string): IComponent;
  buildTemplate: (templateDefinition: any) => () => IComponent
}

export const ComponentDB: Map<string, ComponentConstructor> = new Map();
