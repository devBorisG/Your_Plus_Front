  import { Injectable } from '@angular/core';
  import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
  } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { AuthService } from 'src/app/login/service/login.service';
  import { environment } from 'src/environments/environment';

  @Injectable()
  export class JwtInterceptor implements HttpInterceptor{
    constructor(private auth: AuthService) { }

      intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
          const token = this.auth.getToken();
          const isApiUrl = request.url.startsWith(environment.url);
          const ignoreUrls = [`${environment.urlautentication}`, `${environment.urlpersona}`];
          if (isApiUrl && !ignoreUrls.some(url => request.url.includes(url))) {
              request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${token}`,
                  }
              });
              console.log("el request es : ",request);
          }

          return next.handle(request);
        }
  }
