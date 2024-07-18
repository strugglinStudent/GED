import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private uploadUrl = `${environment.api}/documents`;
  constructor(private http: HttpClient) {}

  uploadDocuments(files: FileList): Observable<any> {
    const formData: FormData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('files', file, file.name);
    });


    return this.http.post<any>(`${this.uploadUrl}/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / event.total!);
            return { status: 'progress', message: progress };
          case HttpEventType.Response:
            return { status: 'done', message: event.body };
          default:
            return `Unhandled event: ${event.type}`;
        }
      })
    );
  }
  uploadDocumentsm(files: FileList): Observable<any> {
    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    const req = new HttpRequest('POST', `${this.uploadUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / event.total!);
            return { status: 'progress', message: progress };
          case HttpEventType.Response:
            return { status: 'done', message: event.body };
          default:
            return `Unhandled event: ${event.type}`;
        }
      })
    );
  }

  uploadDocument(file: File): Observable<any> {
    const formData = new FormData();

    formData.append('file', file, file.name);
    const req = new HttpRequest('POST', `${this.uploadUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req).pipe(
      map(event => {
        console.log(event.type);
        switch (event.type) {
          case HttpEventType.Sent:
            return { status: 'uploading', message: 0, fileName: file.name };
          case HttpEventType.UploadProgress: {
            console.log('uploading', 'message:', event.loaded, 'fileName:', file.name);
            return {status: 'uploading', message: event.loaded, fileName: file.name};
          }
          case HttpEventType.Response:
            return { status: 'success', message: event.body, fileName: file.name };
          default:
            return { status: 'fail', message: `Unhandled event: ${event.type}`, fileName: file.name };
        }
      })
    );
  }
}
