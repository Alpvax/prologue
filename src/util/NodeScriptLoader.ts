import {IScriptLoader} from "../core/IContentProvider";
import fs from "fs";
import path from "path";

const loader: IScriptLoader = {
  loadFromDir(directory: string, pattern: RegExp): Promise<any[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(directory, (err, files) => {
        if (err !== undefined) {
          reject(err);
        }
        return Promise.all(files.map((file) => this.loadFile(path.join(directory, file)))).then(resolve);
      });
    });
  },
  loadFile(path: string): Promise<any> {
    return import(path);
  }
}

export default loader;
