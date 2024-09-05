import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-image-cropper-dialog-dialog',
  templateUrl: './image-cropper-dialog.component.html',
  styleUrls: ['./image-cropper-dialog.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    ImageCropperComponent,
    FormsModule,
    NgIf,
    MatButton,
    MatDialogContent,
    MatDialogActions,
    MatInput,
    MatDialogTitle,
    MatIcon,
  ],
})
export class ImageCropperDialogComponent {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppingImage: any = '';
  showCropper = true;
  imageURL?: string;
  filename?: string | null;
  constructor(public dialogRef: MatDialogRef<ImageCropperComponent>) {}
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.filename = event.target.files[0].name;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.blob;
    this.croppingImage = event;
    console.log(event.objectUrl, event.blob);
  }
  imageLoaded() {
    // show cropper
    if (this.imageURL) {
      this.showCropper = true;
      console.log('Image loaded');
    }
  }
  cropperReady() {}
  loadImageFailed() {
    // show message
    console.error('Load image failed');
  }

  onSave() {
    this.dialogRef.close(new File([this.croppedImage], this.filename, { type: 'image/png' }));
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
