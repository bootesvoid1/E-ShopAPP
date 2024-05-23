import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.currentUser();
    console.log(currentUser);

    if (currentUser) {
      const idToken = currentUser.getIdToken();
      if (idToken) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${idToken}`
          }
        });
      }
    }

    return next.handle(request);
  }
}
