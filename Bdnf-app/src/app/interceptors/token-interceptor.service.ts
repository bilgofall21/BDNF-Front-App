import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Interceptor appelé");

    const token = localStorage.getItem('access_token');
    if (token) {
      console.log("Token trouvé:", token);
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Requête clonée avec en-têtes:", clonedReq.headers.keys());
      return next.handle(clonedReq);
    } else {
      console.log("Aucun token trouvé");
      return next.handle(req);
    }
  }
}
