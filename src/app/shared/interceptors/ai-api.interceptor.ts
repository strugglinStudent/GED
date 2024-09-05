import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AiApiInterceptor implements HttpInterceptor {
  private groqapiKey = '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'; // replace with your actual API key
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('api.groq.com')) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${this.groqapiKey}`),
      });
    }
    return next.handle(req);
  }
}
