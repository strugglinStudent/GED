import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FileSizePipe } from '../../../../../shared/pipes/file-size.pipe';
import { TruncateNamePipe } from '../../../../../shared/pipes/truncate-name.pipe';
@Component({
  selector: 'app-single-file-upload',
  templateUrl: './single-file-upload.component.html',
  styleUrls: ['./single-file-upload.component.css'],
  providers: [FileSizePipe, TruncateNamePipe],
})
export class SingleFileUploadComponent {
  status: 'initial' | 'uploading' | 'success' | 'fail' = 'initial';
  file: File | null = null;
  progress = 0;
  loaded = 0;
  isDragging = false;
  hideCard = false;
  hideAllCards = false;

  constructor(private http: HttpClient) {}

  onChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.status = 'initial';
      this.file = file;
      this.hideCard = false;
      this.onUpload();
    }
  }

  onFileDropped(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer && event.dataTransfer.files) {
      this.file = event.dataTransfer.files[0];
      this.status = 'initial';
      this.hideCard = false;
      this.onUpload();
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  async onUpload() {
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file, this.file.name);
      this.status = 'uploading';

      try {
        await this.http
          .post('http://localhost:8290/api/documents/upload', formData, {
            reportProgress: true,
            observe: 'events',
          })
          .pipe(
            map((event: any) => {
              if (event.type == HttpEventType.UploadProgress) {
                if (event.total !== 0) {
                  this.progress = Math.round((358 / event.total) * event.loaded);
                  this.loaded = event.loaded;
                }
              } else if (event.type == HttpEventType.Response) {
                this.status = 'success';
                this.progress = 0;
              }
            }),
            catchError((err: any) => {
              this.status = 'fail';
              this.progress = 0;
              alert(err.message);
              return throwError(err.message);
            }),
          )
          .toPromise();
      } catch (error) {
        console.error('Upload failed', error);
      }
    }
  }

  hideDocumentCard() {
    this.hideCard = true;
  }

  hideAllDocumentCards() {
    this.hideAllCards = true;
  }

  removeFile() {
    this.file = null;
    this.status = 'initial';
  }

  openDocument() {
    if (this.file) {
      const url = URL.createObjectURL(this.file);
      window.open(url);
    }
  }
}
