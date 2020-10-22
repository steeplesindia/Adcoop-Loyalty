"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthGuardService = void 0;
var core_1 = require("@angular/core");
var base_class_1 = require("../utils/base.class");
var AuthGuardService = /** @class */ (function (_super) {
    __extends(AuthGuardService, _super);
    function AuthGuardService(injector) {
        return _super.call(this, injector) || this;
    }
    AuthGuardService.prototype.canActivate = function () {
        var _this = this;
        return this.storageService.authenticated.then(function (res) {
            if (!res) {
                _this.navigate('login');
                _this.enableSideMenu(false);
                return false;
            }
            _this.enableSideMenu(true);
            return true;
        });
    };
    AuthGuardService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthGuardService);
    return AuthGuardService;
}(base_class_1.Base));
exports.AuthGuardService = AuthGuardService;
