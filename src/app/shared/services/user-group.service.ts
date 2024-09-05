import { Injectable } from '@angular/core';
import { UserGroup } from 'app/shared/models/user';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserGroupService {
  private apiUrl = `${environment.api}/user-groups`;

  constructor(private httpClient: HttpClient) {}

  // Create a new UserGroup
  addUserGroup(userGroup: UserGroup): Observable<UserGroup> {
    return this.httpClient.post<UserGroup>(this.apiUrl, userGroup);
  }

  // Get all UserGroups
  getUserGroups(): Observable<UserGroup[]> {
    return this.httpClient.get<UserGroup[]>(this.apiUrl);
  }

  // Get a single UserGroup by ID
  getUserGroupById(id: string): Observable<UserGroup> {
    return this.httpClient.get<UserGroup>(`${this.apiUrl}/${id}`);
  }

  // Update a UserGroup by ID
  updateUserGroup(id: string, userGroup: UserGroup): Observable<UserGroup> {
    return this.httpClient.put<UserGroup>(`${this.apiUrl}/${id}`, userGroup);
  }

  // Delete a UserGroup by ID
  deleteUserGroup(id: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
