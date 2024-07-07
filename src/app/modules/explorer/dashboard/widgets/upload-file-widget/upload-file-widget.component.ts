import { Component, QueryList, ViewChildren } from '@angular/core';
import {
  ConsumerStatusService,
  FileStatus,
  FileStatusPhase,
} from '../../../../../shared/services/consumer-status.service';
import { UploadDocumentsService } from '../../../../../shared/services/upload-documents.service';
import { RouterLink } from '@angular/router';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { WidgetFrameComponent } from '../widget-frame/widget-frame.component';
import { MatButton } from '@angular/material/button';

const MAX_ALERTS = 5;

@Component({
  selector: 'pngx-upload-file-widget',
  templateUrl: './upload-file-widget.component.html',
  styleUrls: ['./upload-file-widget.component.scss'],
  imports: [RouterLink, NgTemplateOutlet, NgClass, WidgetFrameComponent, MatButton],
  standalone: true,
})
export class UploadFileWidgetComponent {
  alertsExpanded = false;
  constructor(
    private consumerStatusService: ConsumerStatusService,
    private uploadDocumentsService: UploadDocumentsService,
  ) {}

  getStatus() {
    return this.consumerStatusService.getConsumerStatus().slice(0, MAX_ALERTS);
  }

  getStatusSummary() {
    let strings = [];
    let countUploadingAndProcessing =
      this.consumerStatusService.getConsumerStatusNotCompleted().length;
    let countFailed = this.getStatusFailed().length;
    let countSuccess = this.getStatusSuccess().length;
    if (countUploadingAndProcessing > 0) {
      strings.push(`Processing: ${countUploadingAndProcessing}`);
    }
    if (countFailed > 0) {
      strings.push(`Failed: ${countFailed}`);
    }
    if (countSuccess > 0) {
      strings.push(`Added: ${countSuccess}`);
    }
    return strings.join(
      `:this string is used to separate processing, failed and added on the file upload widget:, `,
    );
  }

  getStatusHidden() {
    if (this.consumerStatusService.getConsumerStatus().length < MAX_ALERTS) return [];
    else return this.consumerStatusService.getConsumerStatus().slice(MAX_ALERTS);
  }

  getStatusUploading() {
    return this.consumerStatusService.getConsumerStatus(FileStatusPhase.UPLOADING);
  }

  getStatusFailed() {
    return this.consumerStatusService.getConsumerStatus(FileStatusPhase.FAILED);
  }

  getStatusSuccess() {
    return this.consumerStatusService.getConsumerStatus(FileStatusPhase.SUCCESS);
  }

  getStatusCompleted() {
    return this.consumerStatusService.getConsumerStatusCompleted();
  }

  getTotalUploadProgress() {
    let current = 0;
    let max = 0;

    this.getStatusUploading().forEach((status) => {
      current += status.currentPhaseProgress;
      max += status.currentPhaseMaxProgress;
    });

    return current / Math.max(max, 1);
  }

  isFinished(status: FileStatus) {
    return status.phase == FileStatusPhase.FAILED || status.phase == FileStatusPhase.SUCCESS;
  }

  getStatusColor(status: FileStatus) {
    switch (status.phase) {
      case FileStatusPhase.UPLOADING:
      case FileStatusPhase.STARTED:
      case FileStatusPhase.WORKING:
        return 'primary';
      case FileStatusPhase.FAILED:
        return 'danger';
      case FileStatusPhase.SUCCESS:
        return 'success';
    }
  }

  dismiss(status: FileStatus) {
    this.consumerStatusService.dismiss(status);
  }

  dismissCompleted() {
    this.getStatusCompleted().forEach((status) => this.consumerStatusService.dismiss(status));
  }

  public onFileSelected(event: Event) {
    this.uploadDocumentsService.uploadFiles((event.target as HTMLInputElement).files);
  }
}
