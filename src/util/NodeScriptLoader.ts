import {IScriptLoader} from "../core/IContentProvider";
import * as fs from "fs";
import * as path from "path";

const loader: IScriptLoader = {
  loadFromDir(directory: string, pattern: RegExp): Promise<any[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(directory, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(Promise.all(files.filter((file) => pattern.test(file)).map((file) => this.loadFile(path.join(directory, file)))));
        }
      });
    });
  },
  loadFile(filepath: string): Promise<any> {
    return import(path.resolve(filepath));
  }
}

export default loader;
