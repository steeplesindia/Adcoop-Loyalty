import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let req1 = req.clone();
        // if (req1.method.toLowerCase() == "post") {
        //     let body = req1.body;
        //     body["dataAreaId"] = this.dataService.dataAreaId;
        //     console.log(req1.body)
        // }
        return next.handle(req1);
    }
}