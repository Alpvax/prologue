import {Entity} from "./GameObjectManager";

interface IComponentFactory<T> {
  name: string;
  get: (entityID: Entity) => T;
  new (template?: Partial<T>): T
}

interface IComponentStore<T extends Component> {

}

abstract class Component {

}
