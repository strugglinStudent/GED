import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentService } from 'app/shared/services/document.service';
import { environment } from 'environments/environment';
// eslint-disable-next-line @typescript-eslint/no-redeclare
import { DisplayMode, Document } from 'app/shared/models/document';
import { SnackBarService } from 'app/shared/services/snack-bar.service';
interface ProgressInfo {
  status: 'initial' | 'compressing' | 'OCR performing' | 'uploading' | 'success' | 'fail';
  loadSize: number;
  file: File;
}
@Component({
  selector: 'app-document-dashboard',
  templateUrl: './document-dashboard.component.html',
  styleUrls: ['./document-dashboard.component.scss'],
})
export class DocumentDashboardComponent implements OnInit {
  @Input() displayMode: 'table' | 'smallCards' | 'largeCards' = 'table';
  protected readonly DisplayMode = DisplayMode;
  dataSource: MatTableDataSource<Document> = new MatTableDataSource<Document>();
  selectedFiles: File[] = [];
  messages: string[] = [];
  isDragging = false;
  progressInfos: ProgressInfo[] = [];
  constructor(
    private documentService: DocumentService,
    private snackBar: SnackBarService,
  ) {}
  ngOnInit(): void {
    this.loadDocuments();
  }
  loadDocuments(): void {
    this.documentService.getAllDocuments().subscribe((documents: Document[]) => {
      this.dataSource.data = documents.map((document) => ({
        ...document,
        path: `${environment.api}/${document.path}`,
      }));
    });
  }

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
    const files: File[] = Array.from(event.dataTransfer?.files || []);
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
      fileArray.forEach((file, index) => {
        const progressInfo: ProgressInfo = {
          status: 'OCR performing',
          loadSize: 0,
          file: file,
        };
        this.progressInfos.push(progressInfo);
        this.documentService.uploadDocument(file).subscribe({
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
              this.loadDocuments();
            }
          },
          error: (err) => {
            this.progressInfos[index] = { status: 'fail', loadSize: 0, file: file };
          },
        });
      });
    }
  }
}
