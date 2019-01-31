import {EventEmitter} from "events";
import System from "./System";

export type initialiationFunc = (eventBus: EventEmitter) => void | Promise<void>;

export interface Plugin {
  systems?: () => Array<System>;
  //TODO: components?: () => Array<Component>;
  //TODO: templates?: () => Array<Template>;
}

const eventBus = new EventEmitter();

const eventTypes = new Map<string | symbol, Event<any, any>>();

interface EventType<T> {
  name: string | symbol;
  data: T;
}

class Event<DataType, ReturnType> {
  private listeners: Array<(data: DataType) => ReturnType | Promise<ReturnType>> = [];
  constructor(readonly name: string | symbol) {
  }
  public async emit(data: DataType): Promise<Array<ReturnType>> {
    let ls: Array<ReturnType | Promise<ReturnType>> = this.listeners.map((l) => l(data));
    return Promise.all(ls);
  }
}

function registerEvent(event: Event<any, any>): void {
  eventTypes.set(event.name, event);
}


eventBus.emit()
