import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthUtils } from '../guards/auth.utils';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpoint = `${environment.api}/users`;
  private _authenticated = false;
  authenticationSubject: BehaviorSubject<any> = new BehaviorSubject<boolean>(false);
  private _user: User;

  constructor(
    private http: HttpClient,
    private _router: Router,
  ) {}

  /**
   * getter for access token
   */
  get accessToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  get refreshToken(): string {
    return localStorage.getItem('refreshToken') ?? '';
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }
    // Check the access token availability
    if (!this.accessToken || this.accessToken === 'undefined') {
      localStorage.removeItem('token');
      return of(false);
    }
    // Check the access token expire date
    if (
      (this.refreshToken || this.refreshToken === 'undefined') &&
      AuthUtils.isTokenExpired(this.refreshToken)
    ) {
      return of(false);
    }
    if (
      (this.refreshToken || this.refreshToken === 'undefined') &&
      AuthUtils.isTokenExpired(this.accessToken)
    ) {
      return of(true);
    }
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }
    return of(true);
  }

  /**
   * Sign out
   */
  signOut(): Observable<any> {
    // Remove the access token from the local storage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    // Set the authenticated flag to false
    this._authenticated = false;
    this._router.navigate(['sign-in']);
    // Return the observable
    return of(true);
  }

  /**
   * Sign UP
   */
  signUp(newUser: {
    name: string;
    company: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<User>(`${this.endpoint}/`, newUser);
  }

  /**
   * Sign IN
   */
  signIn(user: User): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/login`, user);
  }

  /**
   * Refresh Token
   */

  refresh() {
    // Logique pour rafraîchir le token JWT depuis le serveur
    return this.http
      .post<any>(`${this.endpoint}/refreshToken`, { refresh: this.refreshToken })
      .pipe(
        tap((response) => {
          // Mettre à jour le token JWT dans le stockage local
          localStorage.setItem('token', response.token);
        }),
        catchError(() => {
          this.signOut();
          return of(false); // Retourner un observable indiquant un échec
        }),
      );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.endpoint}/forget-password`, email);
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.endpoint}/reset-password`, { token, newPassword });
  }
}
