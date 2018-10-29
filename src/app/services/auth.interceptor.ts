import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

        const token = localStorage.getItem("token");

        if (token) {
            req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`,
                 /*  'Content-Type': 'application/x-www-form-urlencoded' */
                }
              });

            return next.handle(req);
        }
        else {
            return next.handle(req);
        }
    }
}