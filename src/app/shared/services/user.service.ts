import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/shared/models/user';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { jwtDecode } from 'jwt-decode';
@Injectable({ providedIn: 'root' })
export class UserService {
  private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
  private apiUrl = `${environment.api}/users`;

  // Helper method to get HTTP options with Authorization header
  private getHttpOptions() {
    const token = localStorage.getItem('token'); // Assume the token is stored in local storage
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  /**
   * Constructor
   */
  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService,
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for user
   *
   * @param value
   */
  set user(value: User) {
    // Store the value
    this._user.next(value);
  }

  get user$(): Observable<User> {
    return this._user.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get the current logged-in user data
   */
  getUserId(): string {
    if (this._authService.accessToken) {
      const decodedToken: any = jwtDecode(this._authService.accessToken);
      return decodedToken ? decodedToken.id : null;
    }
  }
  get(): Observable<User> {
    const userId = this.getUserId();
    if (userId) {
      // If user ID is available, return it directly
      return this._httpClient
        .get<any>(`${this.apiUrl}/${userId}`)
        .pipe(tap((user) => this._user.next(user)));
    }
  }

  /**
   * Update the user
   *
   * @param user
   */
  update(user: User): Observable<any> {
    const userId = this.getUserId();
    if (userId) {
      return this._httpClient.patch<User>(`${this.apiUrl}/${userId}`, user).pipe(
        map((response) => {
          this._user.next(response);
        }),
      );
    }
  }

  // CRUD functions

  addUser(user: User): Observable<User> {
    return this._httpClient.post<User>(this.apiUrl, user, this.getHttpOptions());
  }
  getUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>(this.apiUrl, this.getHttpOptions());
  }
  updateUser(user: User): Observable<User> {
    return this._httpClient.put<User>(`${this.apiUrl}/${user._id}`, user, this.getHttpOptions());
  }

  deleteUser(_id: string): Observable<void> {
    return this._httpClient.delete<void>(`${this.apiUrl}/${_id}`, this.getHttpOptions());
  }

  updateAvatar(file: File): Observable<any> {
    const userId = this.getUserId(); // Get the user ID
    const formData = new FormData();
    formData.append('avatar', file, file.name);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this._httpClient.put(`${this.apiUrl}/${userId}/avatar`, formData, httpOptions);
  }

  //check role:
  isSuperAdmin(user: User): boolean {
    return user.role === 'SuperAdmin';
  }

  isAdmin(user: User): boolean {
    return user.role === 'Admin';
  }

  isUser(user: User): boolean {
    return user.role === 'User';
  }
}
