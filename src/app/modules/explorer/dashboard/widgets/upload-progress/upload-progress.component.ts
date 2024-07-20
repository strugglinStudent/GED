import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatButton, MatIconButton } from '@angular/material/button';
import { FileSizePipe } from '../../../../../shared/pipes/file-size.pipe';
import { TruncateNamePipe } from '../../../../../shared/pipes/truncate-name.pipe';
import { MatIcon } from '@angular/material/icon';

interface ProgressInfo {
  status: 'initial' | 'uploading' | 'success' | 'fail';
  loadSize: number;
  file: File;
}

@Component({
  selector: 'app-upload-progress',
  templateUrl: './upload-progress.component.html',
  styleUrls: ['./upload-progress.component.scss'],
  providers: [FileSizePipe, TruncateNamePipe],
  imports: [
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
export class UploadProgressComponent implements OnChanges {
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
    this.hideAllCards = true;
  }

  closeFile(index: number): void {
    this.progressInfos.splice(index, 1);
  }

  openDocument(file: File): void {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, '_blank');
  }
}
