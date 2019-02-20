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
var Event = /** @class */ (function () {
    function Event(name) {
        this.name = name;
        this.listeners = [];
    }
    Event.prototype.emit = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var ls;
            return __generator(this, function (_a) {
                ls = this.listeners.map(function (l) { return l(data); });
                return [2 /*return*/, Promise.all(ls)];
            });
        });
    };
    Event.prototype.on = function (listener) {
        this.listeners.push(listener);
    };
    return Event;
}());
exports.Event = Event;
var EventBus = /** @class */ (function () {
    function EventBus() {
        this.unregisteredEventListeners = new Map();
        this.events = new Map();
    }
    EventBus.prototype.registerEvent = function (event) {
        if (this.events.has(event.name)) {
            throw new Error("Attempting to define multiple events with same name: \"" + event.name.toString() + "\"");
        }
        this.events.set(event.name, event);
        if (this.unregisteredEventListeners.has(event.name)) {
            this.unregisteredEventListeners.get(event.name).forEach(function (l) { return event.on(l); });
        }
        return this;
    };
    EventBus.prototype.getEvent = function (event) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!(event instanceof Event)) {
                if (_this.events.has(event)) {
                    event = _this.events.get(event); // We know that it won't return undefined
                }
                else {
                    reject(event.toString());
                }
            }
            resolve(event);
        });
    };
    EventBus.prototype.on = function (event, listener) {
        var _this = this;
        this.getEvent(event)
            .then(function (event) { return event.on(listener); })["catch"](function (name) {
            if (!_this.unregisteredEventListeners.has(name)) {
                _this.unregisteredEventListeners.set(name, []);
            }
            _this.unregisteredEventListeners.get(name).push(listener);
        });
        return this;
    };
    EventBus.prototype.emit = function (event, data) {
        return this.getEvent(event)
            .then(function (event) { return event.emit(data); })["catch"](function (name) {
            throw new Error("Cannot emit an unregistered event: " + name);
        });
    };
    EventBus.Event = Event;
    return EventBus;
}());
exports["default"] = EventBus;
