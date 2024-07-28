import { Component, Input, OnChanges } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FileSizePipe } from '../../../shared/pipes/file-size.pipe';
import { TruncateNamePipe } from '../../../shared/pipes/truncate-name.pipe';

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
  imports: [
    ScrollingModule,
    NgForOf,
    NgIf,
    MatCard,
    MatButton,
    FileSizePipe,
    TruncateNamePipe,
    MatIcon,
    MatIconButton,
  ],
  standalone: true,
})
export class DocumentProgressComponent implements OnChanges {
  @Input() progressInfos: ProgressInfo[] = [];
  @Input() messages: string[] = [];
  hideAllCards = false;

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
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, '_blank');
  }
  setAutoCloseTimeout(file: File): void {
    const info = this.progressInfos.find((progressInfo) => progressInfo.file === file);
    if ((info.status === 'success' || info.status === 'fail') && !info.timeoutId) {
      info.timeoutId = window.setTimeout(() => {
        this.closeFile(file);
      }, 15000); // Set timeout to 3 seconds
    }
  }
}
