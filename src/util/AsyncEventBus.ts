type EventName = string | symbol;

type EventListener<DataType, ReturnType> = (data: DataType) => ReturnType | Promise<ReturnType>;

export class Event<DataType, ReturnType> {
  private listeners: Array<(data: DataType) => ReturnType | Promise<ReturnType>> = [];
  constructor(readonly name: EventName) {}
  public async emit(data: DataType): Promise<Array<ReturnType>> {
    let ls: Array<ReturnType | Promise<ReturnType>> = this.listeners.map((l) => l(data));
    return Promise.all(ls);
  }
  public on(listener: EventListener<DataType, ReturnType>): void {
    this.listeners.push(listener);
  }
}

export default class EventBus {
  public static readonly Event = Event;

  private readonly unregisteredEventListeners = new Map<EventName, Array<EventListener<any, any>>>();
  readonly events = new Map<EventName, Event<any, any>>();
  public registerEvent<DataType, ReturnType>(event: Event<DataType, ReturnType>): this {
    if (this.events.has(event.name)) {
      throw new Error(`Attempting to define multiple events with same name: "${event.name.toString()}"`)
    }
    this.events.set(name, event);
    if (this.unregisteredEventListeners.has(event.name)) {
      this.unregisteredEventListeners.get(event.name)!.forEach((l) => event.on(l));
    }
    return this;
  }
  private getEvent<DataType, ReturnType>(event: EventName | Event<DataType, ReturnType>): Promise<Event<DataType, ReturnType>> {
    return new Promise((resolve, reject) => {
      if (!(event instanceof Event)) {
        if (this.events.has(event)) {
          event = this.events.get(event)!; // We know that it won't return undefined
        } else {
          reject(event.toString());
        }
      }
      resolve(<Event<DataType, ReturnType>>event);
    });
  }
  public on<DataType, ReturnType>(event: EventName | Event<DataType, ReturnType>, listener: EventListener<DataType, ReturnType>): this {
    this.getEvent(event)
      .then((event) => event.on(listener))
      .catch((name) => {
        if (!this.unregisteredEventListeners.has(name)) {
          this.unregisteredEventListeners.set(name, []);
        }
        this.unregisteredEventListeners.get(name)!.push(listener);
      });
    return this;
  }
  public emit<DataType, ReturnType>(event: EventName | Event<DataType, ReturnType>, data: DataType): Promise<Array<ReturnType>> {
    return this.getEvent(event)
      .then((event) => event.emit(data))
      .catch((name) => {
        throw new Error("Cannot emit an unregistered event: " + name);
      });
  }
}
