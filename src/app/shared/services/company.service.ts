import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from 'app/shared/models/company';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrl = `${environment.api}/companies/`;
  constructor(private http: HttpClient) {}

  // Create a new company
  addCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(this.apiUrl, company);
  }

  // Get all companies
  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl);
  }

  // Get a company by name
  getCompanyById(_id: string): Observable<Company> {
    return this.http.get<Company>(`${this.apiUrl}${_id}`);
  }

  // Update a company by name
  updateCompany(company: Company): Observable<Company> {
    return this.http.put<Company>(`${this.apiUrl}${company._id}`, company);
  }

  // Delete a company by name
  deleteCompany(_id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${_id}`);
  }
}
