"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StorageService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var StorageService = /** @class */ (function () {
    function StorageService(storage) {
        this.storage = storage;
        this._userDataChange$ = new rxjs_1.Subject();
        this.userData$ = this._userDataChange$.asObservable();
    }
    StorageService.prototype.setAuthenticated = function (auth) { this.storage.set('authenticated', auth); };
    Object.defineProperty(StorageService.prototype, "authenticated", {
        get: function () { return this.storage.get('authenticated'); },
        enumerable: false,
        configurable: true
    });
    StorageService.prototype.setUser = function (data) {
        this.storage.set('user', data);
        this._userDataChange$.next(data);
    };
    Object.defineProperty(StorageService.prototype, "user", {
        get: function () {
            return this.storage.get('user');
        },
        enumerable: false,
        configurable: true
    });
    StorageService.prototype.clearStorage = function () {
        this.storage.clear();
    };
    StorageService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], StorageService);
    return StorageService;
}());
exports.StorageService = StorageService;
