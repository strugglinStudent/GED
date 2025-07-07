import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, map, switchMap } from 'rxjs/operators';
// eslint-disable-next-line @typescript-eslint/no-redeclare
import { Document } from '../models/document';
import { SnackBarService } from './snack-bar.service';
@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private uploadUrl = `${environment.api}/documents`;
  constructor(
    private http: HttpClient,
    private snackBar: SnackBarService,
  ) {}

  // Upload document with compression
  uploadDocument(file: File): Observable<any> {
    const document = {
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
      uploadDate: new Date(),
      content: '',
      path: '',
    };

    const formData = new FormData();
    formData.append('file', file);
    formData.append('document', JSON.stringify(document));

    const req = new HttpRequest('POST', `${this.uploadUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req).pipe(
      map((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            return {
              status: 'initial',
              message: document.size,
              fileName: document.originalName,
            };
          case HttpEventType.UploadProgress:
            const progress = Math.round((100 * event.loaded) / (event.total || 1));
            return {
              status: 'uploading',
              message: progress,
              fileName: document.originalName,
            };
          case HttpEventType.Response:
            return {
              status: 'success',
              message: event.body,
              fileName: document.originalName,
            };
          default:
            return {
              status: 'fail',
              message: `Unhandled event: ${event.type}`,
              fileName: document.originalName,
            };
        }
      }),
    );
  }

  getAllDocuments(pageIndex: number = 0, pageSize: number = 10): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.uploadUrl}/getAllDocuments`);
  }
  // Delete a document
  deleteDocument(id: string): Observable<any> {
    return this.http.delete(`${this.uploadUrl}/documents/${id}`);
  }
  // Validate document
  validateDocument(id: string): Observable<any> {
    return this.http.post(`${this.uploadUrl}/documents/${id}/validate`, {});
  }

  // Approve document
  approveDocument(id: string): Observable<any> {
    return this.http.post(`${this.uploadUrl}/documents/${id}/approve`, {});
  }

  // Reject document
  rejectDocument(id: string): Observable<any> {
    return this.http.post(`${this.uploadUrl}/documents/${id}/reject`, {});
  }

  getArchivedDocuments() {
    return this.http.get<Document[]>(`${this.uploadUrl}/getArchivedDocuments`);
  }

  getContents() {
    return this.http.get<any>(`${this.uploadUrl}/getContents`);
  }

  archiveDocument(id: string) {
    return this.http.post(`${this.uploadUrl}/documents/${id}/archive`, {});
  }
}
