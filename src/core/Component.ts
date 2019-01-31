import {Entity} from "./GameObjectManager";

export interface Component {

}

export default interface ComponentConstructor {
  new (templateDefinition: object): Component;
}
