import {Event, EventName, EventListener} from "./Event"

export {Event} from "./Event";

export {default as EventBus} from "./AsyncEventBus";

export const Events = {
  registerSystem:     new Event<null, any>("register_system"),
  registerComponent:  new Event<null, any>("register_component"),
  registerTemplate:   new Event<null, any>("register_template"),
}
