import { Component, Input, OnChanges } from '@angular/core';
import { FileSizePipe } from '../../../shared/pipes/file-size.pipe';
import { TruncateNamePipe } from '../../../shared/pipes/truncate-name.pipe';
import { DocumentDialogComponent } from '../document-dialog/document-dialog.component';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';

interface ProgressInfo {
  status: 'initial' | 'compressing' | 'OCR performing' | 'uploading' | 'success' | 'fail';
  loadSize: number;
  file: File;
  timeoutId?: number;
}

@Component({
  selector: 'app-document-progress',
  templateUrl: './document-progress.component.html',
  styleUrls: ['./document-progress.component.scss'],
  providers: [FileSizePipe, TruncateNamePipe],
})
export class DocumentProgressComponent implements OnChanges {
  @Input() progressInfos: ProgressInfo[] = [];
  @Input() messages: string[] = [];
  hideAllCards = false;
  constructor(
    private snackBar: SnackBarService,
    private dialog: MatDialog,
  ) {}
  ngOnChanges(): void {
    this.hideAllCards = false;
  }

  progress(loaded: number, total: number): number {
    return Math.round(90 * (loaded / total));
  }

  showAgain(): void {
    this.hideAllCards = false;
  }

  hideAllDocumentCard(): void {
    this.progressInfos.forEach((info) => {
      if (info.status === 'success' || info.status === 'fail') {
        this.closeFile(info.file);
      }
    });
    this.hideAllCards = true;
  }

  closeFile(file: File): void {
    const index = this.progressInfos.findIndex((info) => info.file === file);
    if (index !== -1) {
      const info = this.progressInfos[index];
      if (info.timeoutId) {
        clearTimeout(info.timeoutId);
      }
      this.progressInfos.splice(index, 1);
    }
  }
  url(file: File) {
    return URL.createObjectURL(file);
  }

  openDocument(file: File): void {
    this.dialog.open(DocumentDialogComponent, {
      width: '80%',
      data: {
        document,
      },
    });
  }
  setAutoCloseTimeout(info: ProgressInfo): void {
    if ((info.status === 'success' || info.status === 'fail') && !info.timeoutId) {
      info.timeoutId = window.setTimeout(() => {
        this.closeFile(info.file);
      }, 15000); // Set timeout to 3 seconds
    }
  }
}
