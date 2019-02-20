"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var AsyncEventBus_1 = require("../util/AsyncEventBus");
var LOADING_BUS = new AsyncEventBus_1["default"]();
var registryEvents = {
    system: new AsyncEventBus_1.Event("register_system"),
    component: new AsyncEventBus_1.Event("register_component"),
    template: new AsyncEventBus_1.Event("register_template")
};
Object.values(registryEvents).forEach(function (e) { return LOADING_BUS.registerEvent(e); });
function loadContentProviders() {
    return __awaiter(this, void 0, void 0, function () {
        var contentProviders, _a, systems, components, templates;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    contentProviders = [];
                    return [4 /*yield*/, Promise.all(contentProviders.filter(function (cp) { return cp.init; }).map(function (cp) { return cp.init(LOADING_BUS); }))];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, Promise.all([
                            registryEvents.system.emit(),
                            registryEvents.component.emit(),
                            registryEvents.template.emit(),
                        ])];
                case 2:
                    _a = _b.sent(), systems = _a[0], components = _a[1], templates = _a[2];
                    console.log("LOADED:\n  Systems:\t" + systems + "\n  Components:\t" + components + "\n  Templates:\t" + templates);
                    return [2 /*return*/];
            }
        });
    });
}
loadContentProviders();
