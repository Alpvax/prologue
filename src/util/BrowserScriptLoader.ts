import {IScriptLoader} from "../core/IContentProvider";

const loader: IScriptLoader = {
  loadFromDir(directory: string, pattern: RegExp): Promise<any[]> {
    return Promise.all(["NOTIMPLEMENTED"].map(this.loadFile));
  },
  loadFile(path: string): Promise<any> {
    return new Promise((resolve, reject) => reject("NOTIMPLEMENTED"));
  }
}

export default loader;
