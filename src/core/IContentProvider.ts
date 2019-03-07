import EventBus from "../events/AsyncEventBus";

export default interface IContentProvider {
  /**
   * Called upon startup. Use it to register events and set up event listeners.
   */
  init?: (eventBus: EventBus) => Promise<void>;
  //TODO: systems?: () => Array<System>;
  //TODO: components?: () => Array<Component>;
  //TODO: templates?: () => Array<Template>;
}

export interface IScriptLoader {
  /**
   * Load all files matching pattern from directory. Should probably use `this.loadFile(path)` to load the individual files.
   */
  loadFromDir(directory: string, pattern: RegExp): Promise<Array<any>>;
  loadFile(path: string): Promise<any>;
}
