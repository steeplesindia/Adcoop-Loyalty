"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApiService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var ApiService = /** @class */ (function () {
    function ApiService(http) {
        this.http = http;
        this.baseAddress = "https://giffinwebapi-afz.azurewebsites.net/App/";
    }
    ApiService.prototype.getLegalEntity = function () {
        return this.http.get(this.baseAddress + "GetLegalEntity");
    };
    ApiService.prototype.getProfileAccess = function () {
        return this.http.get(this.baseAddress + "GetProfileAccess");
    };
    ApiService.prototype.userLogin = function (login) {
        var url = this.baseAddress + "Login";
        var body = {
            "UserId": login.UserId,
            "Password": login.Password
        };
        var httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'Application/json'
            })
        };
        console.log(JSON.stringify(body));
        return this.http.post(url, body, httpOptions);
    };
    ApiService.prototype.getStockInHandBySearch = function (data) {
        var url = this.baseAddress + "GetInventOnHandBySearch";
        var httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'Application/json'
            })
        };
        console.log(JSON.stringify(data));
        return this.http.post(url, data, httpOptions);
    };
    ApiService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
