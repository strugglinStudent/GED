import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class OcrApiInterceptor implements HttpInterceptor {
  private ocrApiKey = 'c0c068f56ced7762c9c176c1a3cb0441';
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('api.mindee.net')) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Token ${this.ocrApiKey}`),
      });
    }
    return next.handle(req);
  }
}
