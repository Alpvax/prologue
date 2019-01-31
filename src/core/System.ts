import {initialiationFunc} from "./gameLoader";


export default interface System {
  initSystem?: initialiationFunc;
  systemsLoaded?: initialiationFunc;
}
