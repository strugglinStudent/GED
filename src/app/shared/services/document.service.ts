import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
// eslint-disable-next-line @typescript-eslint/no-redeclare
import { Document } from '../models/document';
declare var cv: any; // Declare cv as a global variable for OpenCV.js
@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private uploadUrl = `${environment.api}/documents`;
  private ocrUrl = 'https://api.ocr.space/parse/image';
  private ocrApiKey = 'K85149267788957';

  constructor(private http: HttpClient) {}

  // Function to compress image using OpenCV.js
  compressImage(imageFile: File): Observable<File> {
    return new Observable((observer) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);

          // Convert canvas to OpenCV Mat format
          const mat = cv.imread(canvas);

          // Perform quantization or any other compression using OpenCV functions
          // Example: Here we convert to grayscale and resize
          cv.cvtColor(mat, mat, cv.COLOR_RGB2GRAY); // Convert to grayscale
          cv.resize(mat, mat, new cv.Size(0, 0), 0.5, 0.5); // Resize to half dimensions

          // Convert OpenCV Mat back to canvas
          cv.imshow(canvas, mat);
          const compressedImage = canvas.toDataURL('image/jpeg');

          // Convert data URL to Blob
          const byteString = atob(compressedImage.split(',')[1]);
          const mimeString = compressedImage.split(',')[0].split(':')[1].split(';')[0];
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const compressedBlob = new Blob([ab], { type: mimeString });

          // Convert Blob to File
          const compressedFile = new File([compressedBlob], imageFile.name, { type: mimeString });

          observer.next(compressedFile);
          observer.complete();
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(imageFile);
    });
  }
  // Upload document with compression
  uploadDocument(file: File, document: Document): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('document', JSON.stringify(document));
    console.log('in upload document', formData);
    const req = new HttpRequest('POST', `${this.uploadUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
      ...this.getHttpOptions(),
    });

    return this.http.request(req).pipe(
      map((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            return { status: 'initial', message: document.size, fileName: document.originalName };
          case HttpEventType.UploadProgress:
            return { status: 'uploading', message: event.loaded, fileName: document.originalName };
          case HttpEventType.Response:
            return { status: 'success', message: event.body, fileName: document.originalName };
          default:
            return {
              status: 'fail',
              message: `Unhandled event: ${event.type}`,
              fileName: document.originalName,
            };
        }
      }),
      catchError((error) => throwError(error)),
    );
  }

  getAllDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.uploadUrl}/getAllDocuments`);
  }

  performOcr(file: File): Observable<any> {
    console.log('start ocr');
    const language: string = 'fre',
      ocrEngine: number = 1,
      isTable: boolean = true,
      detectOrientation: boolean = true;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', language);
    formData.append('OCREngine', ocrEngine.toString());
    formData.append('isTable', isTable.toString());
    formData.append('detectOrientation', detectOrientation.toString());

    const headers = new HttpHeaders({
      apikey: this.ocrApiKey,
    });

    return this.http.post(this.ocrUrl, formData, { headers });
  }

  private getHttpOptions() {
    const token = localStorage.getItem('token'); // Assume the token is stored in local storage
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }
}
