import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService} from '../services/auth.service'


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(public auth: AuthService, private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var auth = this.injector.get(AuthService);
    var authRequest = request.clone({
      headers: request.headers.set('Authorization', 'token ' + auth.loadToken)
  })

      return next.handle(authRequest);
      }
  }