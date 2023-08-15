import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/auth.service';
import { environment } from 'src/environments/environment';


@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(req.url.indexOf(environment.API_URL) < 0  ){
      console.debug('third party api call');
      return next.handle(req);
    }
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    
    if(req.url.indexOf('user/user-kyc') >=0) {
      delete headersConfig['Content-Type'];      
    }
    const token = this.authService.getToken();

    if (token) {
      headersConfig['Authorization'] = `Token ${token}`;
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
