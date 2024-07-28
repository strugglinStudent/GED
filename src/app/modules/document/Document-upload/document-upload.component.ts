import { Component } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { FileSizePipe } from '../../../shared/pipes/file-size.pipe';
import { TruncateNamePipe } from '../../../shared/pipes/truncate-name.pipe';
import { DocumentService } from '../../../shared/services/document.service';
import { DocumentProgressComponent } from '../Document-progress/document-progress.component';
import { SnackBarService } from '../../../shared/services/snack-bar.service';

interface ProgressInfo {
  status: 'initial' | 'compressing' | 'OCR performing' | 'uploading' | 'success' | 'fail';
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

  constructor(
    private documentService: DocumentService,
    private snackBar: SnackBarService,
  ) {}

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

  uploadFiles(): void {
    if (this.selectedFiles) {
      const fileArray = Array.from(this.selectedFiles);
      this.progressInfos = [];
      this.messages = [];
      fileArray.forEach((file, index) => {
        const progressInfo: ProgressInfo = {
          status: 'initial',
          loadSize: 0,
          file: file,
        };
        this.progressInfos.push(progressInfo);

        // Compress the image
        this.documentService.compressImage(file).subscribe({
          next: (compressedFile) => {
            this.progressInfos[index].status = 'compressing';
            // Perform OCR
            this.documentService.performOcr(compressedFile).subscribe({
              next: (Result) => {
                this.progressInfos[index].status = 'OCR performing';

                // Upload the document
                const document = {
                  originalName: `${file.name}`,
                  mimeType: file.type,
                  size: compressedFile.size,
                  uploadDate: new Date(),
                  content: Result.ParsedResults[0]?.ParsedText || 'could not found anything',
                  path: '',
                };
                this.documentService.uploadDocument(compressedFile, document).subscribe({
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
                      this.documentService.getAllDocuments();
                    }
                  },
                  error: (err) => {
                    this.progressInfos[index] = { status: 'fail', loadSize: 0, file: file };
                    this.snackBar.openSnackBar(
                      `Could not upload file ${file.name}: ${err.message}`,
                    );
                  },
                });
              },
              error: (err) => {
                this.progressInfos[index] = { status: 'fail', loadSize: 0, file: file };
                this.snackBar.openSnackBar(
                  `Failed to perform OCR on file ${file.name}: ${err.message}`,
                );
              },
            });
          },
          error: (err) => {
            this.progressInfos[index] = { status: 'fail', loadSize: 0, file: file };
            this.snackBar.openSnackBar(`Failed to compress file ${file.name}: ${err.message}`);
          },
        });
      });
    }
  }
}
