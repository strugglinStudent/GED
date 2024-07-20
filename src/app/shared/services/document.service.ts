import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, map, switchMap } from 'rxjs/operators';

declare var cv: any; // Declare cv as a global variable for OpenCV.js

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private uploadUrl = `${environment.api}/documents`;

  constructor(private http: HttpClient) {}

  // Function to compress image using OpenCV.js
  compressImage(imageFile: File): Observable<any> {
    console.log('make it here in compress');
    return new Observable(observer => {
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

          observer.next(compressedBlob);
          observer.complete();
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(imageFile);
    });
  }

  // Upload document with compression
  uploadDocument(file: File): Observable<any> {
    return this.compressImage(file).pipe(
      switchMap(compressedBlob => {
        const formData = new FormData();
        formData.append('file', compressedBlob, file.name);

        const req = new HttpRequest('POST', `${this.uploadUrl}/upload`, formData, {
          reportProgress: true,
          responseType: 'json'
        });

        return this.http.request(req).pipe(
          map(event => {
            switch (event.type) {
              case HttpEventType.Sent:
                return { status: 'uploading', message: 0, fileName: file.name };
              case HttpEventType.UploadProgress:
                return { status: 'uploading', message: event.loaded, fileName: file.name };
              case HttpEventType.Response:
                return { status: 'success', message: event.body, fileName: file.name };
              default:
                return { status: 'fail', message: `Unhandled event: ${event.type}`, fileName: file.name };
            }
          }),
          catchError(error => {
            return throwError(error);
          })
        );
      })
    );
  }
}
