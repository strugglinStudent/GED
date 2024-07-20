import { Component } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { FileSizePipe } from '../../../shared/pipes/file-size.pipe';
import { TruncateNamePipe } from '../../../shared/pipes/truncate-name.pipe';
import { DocumentService } from '../../../shared/services/document.service';
import { DocumentProgressComponent } from '../Document-progress/document-progress.component';

interface ProgressInfo {
  status: 'initial' | 'uploading' | 'success' | 'fail';
  loadSize: number;
  file: File;
}

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss'],
  providers: [FileSizePipe, TruncateNamePipe],
  standalone: true,
  imports: [
    NgClass,
    MatButton,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    NgForOf,
    NgIf,
    DocumentProgressComponent,
  ],
})
export class DocumentUploadComponent {
  selectedFiles?: FileList;
  progressInfos: ProgressInfo[] = [];
  messages: string[] = [];
  isDragging = false;

  constructor(private documentUploadService: DocumentService) {}

  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;
    this.progressInfos = [];
    this.messages = [];
    this.uploadFiles();
  }

  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files) {
      this.selectedFiles = files;
      this.uploadFiles();
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  compressFiles(): void {}
  uploadFiles(): void {
    if (this.selectedFiles) {
      const files = Array.from(this.selectedFiles);
      this.progressInfos = [];
      this.messages = [];

      files.forEach((file, index) => {
        this.progressInfos[index] = { status: 'initial', loadSize: 0, file: file };
        this.documentUploadService.uploadDocument(file).subscribe({
          next: (data) => {
            if (data.status === 'uploading') {
              this.progressInfos[index] = {
                status: data.status,
                loadSize: data.message,
                file: file,
              };
            } else if (data.status === 'success') {
              this.progressInfos[index] = {
                status: data.status,
                loadSize: 0,
                file: file,
              };
              this.messages.push(`File ${file.name} uploaded successfully`);
            }
          },
          error: (err) => {
            this.progressInfos[index] = { status: 'fail', loadSize: 100, file: file };
            this.messages.push(`Could not upload file ${file.name}: ${err.message}`);
          },
        });
      });
    }
  }
}
