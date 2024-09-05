import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/shared/models/user';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { jwtDecode } from 'jwt-decode';
@Injectable({ providedIn: 'root' })
export class UserService {
  private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
  private apiUrl = `${environment.api}/users`;
  private currentUser: User | null = null; // Local variable to store the user

  /**
   * Constructor
   */
  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService,
  ) {
    this.user$.subscribe((user) => {
      this.currentUser = user;
    });
  }

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

  // CRUD functions

  addUser(user: User): Observable<User> {
    return this._httpClient.post<User>(this.apiUrl, user);
  }
  getUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>(this.apiUrl);
  }
  updateUser(user: User): Observable<User> {
    return this._httpClient.put<User>(`${this.apiUrl}/${user._id}`, user);
  }

  deleteUser(_id: string): Observable<void> {
    return this._httpClient.delete<void>(`${this.apiUrl}/${_id}`);
  }

  updateAvatar(file: File): Observable<any> {
    const userId = this.getUserId(); // Get the user ID
    const formData = new FormData();
    formData.append('avatar', file, file.name);
    return this._httpClient.put(`${this.apiUrl}/${userId}/avatar`, formData);
  }

  //check role:

  isSuperAdmin(): boolean {
    return this.currentUser?.role === 'SuperAdmin';
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'Admin';
  }

  isUser(): boolean {
    return this.currentUser?.role === 'User';
  }
}
