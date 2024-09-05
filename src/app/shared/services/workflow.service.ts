import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Workflow } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkflowService {
  private apiUrl = `${environment.api}/user-groups`;

  constructor(private httpClient: HttpClient) {}

  // Create a new Workflow
  addWorkflow(workflow: Workflow): Observable<Workflow> {
    return this.httpClient.post<Workflow>(this.apiUrl, workflow);
  }

  // Get all Workflows
  getWorkflows(): Observable<Workflow[]> {
    return this.httpClient.get<Workflow[]>(this.apiUrl);
  }

  // Get a single Workflow by ID
  getWorkflowById(id: string): Observable<Workflow> {
    return this.httpClient.get<Workflow>(`${this.apiUrl}/${id}`);
  }

  // Update a Workflow by ID
  updateWorkflow(id: string, workflow: Workflow): Observable<Workflow> {
    return this.httpClient.put<Workflow>(`${this.apiUrl}/${id}`, workflow);
  }

  // Delete a Workflow by ID
  deleteWorkflow(id: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
