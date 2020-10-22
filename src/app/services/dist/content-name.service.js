"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContentNameService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var ContentNameService = /** @class */ (function () {
    function ContentNameService() {
        this.indexChanged$ = new rxjs_1.Subject();
        this.Index$ = this.indexChanged$.asObservable();
        this.contentArr = [
            {
                title: 'Stock on Hand',
                icon: 'file-tray'
            },
            {
                title: 'Issue Resolution Notes',
                icon: 'mail'
            },
            {
                title: 'Asset Information',
                icon: 'mail'
            },
            {
                title: 'Ticket Management',
                icon: 'power'
            },
            {
                title: 'Reservation Request',
                icon: 'power'
            },
            {
                title: 'Log Details',
                icon: 'power'
            },
            {
                title: 'Lead Creation',
                icon: 'power'
            },
            {
                title: 'Contact Creation',
                icon: 'power'
            },
            {
                title: 'Logout',
                icon: 'power'
            }
        ];
    }
    Object.defineProperty(ContentNameService.prototype, "contentName", {
        get: function () {
            return this.contentArr;
        },
        enumerable: false,
        configurable: true
    });
    ContentNameService.prototype.setIndex = function (data) {
        this.indexChanged$.next(data);
    };
    ContentNameService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ContentNameService);
    return ContentNameService;
}());
exports.ContentNameService = ContentNameService;
