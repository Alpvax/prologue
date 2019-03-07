export type EventName = string | symbol;

export type EventListener<DataType, ReturnType> = (data: DataType) => ReturnType | Promise<ReturnType>;

export class Event<DataType, ReturnType> {
  private listeners: Array<EventListener<DataType, ReturnType>> = [];
  constructor(readonly name: EventName) {}
  public async emit(data: DataType): Promise<Array<ReturnType>> {
    let ls: Array<ReturnType | Promise<ReturnType>> = this.listeners.map((l) => l(data));
    return Promise.all(ls);
  }
  public on(listener: EventListener<DataType, ReturnType>): void {
    this.listeners.push(listener);
  }
}

export default Event;
