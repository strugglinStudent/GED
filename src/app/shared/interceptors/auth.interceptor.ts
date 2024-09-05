import { Injectable } from '@angular/core';
import { Observable, switchMap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AuthUtils } from '../guards/auth.utils';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}
  /**
   * Intercept
   *
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('api.groq.com') && !req.url.includes('api.mindee.net')) {
      if (
        this._authService.accessToken &&
        !AuthUtils.isTokenExpired(this._authService.accessToken)
      ) {
        req = this.addToken(req);
      }
    }
    // Response
    return next.handle(req).pipe(
      catchError((error) => {
        // Catch "401 Unauthorized" responses
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(req, next);
        }
        return throwError(error);
      }),
    );
  }
  private addToken(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${this._authService.accessToken}`),
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Rafraîchir le token JWT
    return this._authService.refresh().pipe(
      switchMap(() => {
        return next.handle(this.addToken(request));
      }),
      catchError((error) => {
        // Si le rafraîchissement échoue, déconnectez l'utilisateur
        this._authService.signOut();
        return throwError(error);
      }),
    );
  }
}
