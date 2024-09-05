import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DocumentService } from '../../../shared/services/document.service';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
// eslint-disable-next-line @typescript-eslint/no-redeclare
import { Document } from '../../../shared/models/document';
import { DocumentDialogComponent } from '../document-dialog/document-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-document-action',
  templateUrl: './document-action.component.html',
  styleUrl: './document-action.component.scss',
})
export class DocumentActionComponent {
  @Input() document: Document;
  @Output() EventEmitted = new EventEmitter<void>();

  constructor(
    private documentService: DocumentService,
    private snackBar: SnackBarService,
    private dialog: MatDialog,
  ) {}

  validateDocument(id: string): void {
    this.documentService.validateDocument(id).subscribe(
      () => {
        this.snackBar.openSnackBar('Document validated successfully', 'success');
        this.EventEmitted.emit(); // Emit event on successful validation
      },
      (error) => {
        const errorMessage = error?.error || 'Validation failed';
        this.snackBar.openSnackBar(errorMessage, 'error');
      },
    );
  }

  approveDocument(id: string): void {
    this.documentService.approveDocument(id).subscribe(
      () => {
        this.snackBar.openSnackBar('Document approved successfully', 'success');
        this.EventEmitted.emit(); // Emit event on successful approval
      },
      (error) => {
        const errorMessage = error?.error || 'Approval failed';
        this.snackBar.openSnackBar(errorMessage, 'error');
      },
    );
  }

  rejectDocument(id: string): void {
    this.documentService.rejectDocument(id).subscribe(
      () => {
        this.snackBar.openSnackBar('Document rejected successfully', 'success');
        this.EventEmitted.emit(); // Emit event on successful rejection
      },
      (error) => {
        const errorMessage = error?.error || 'Rejection failed';
        this.snackBar.openSnackBar(errorMessage, 'error');
      },
    );
  }
  archiveDocument(id: string): void {
    this.documentService.archiveDocument(id).subscribe(
      () => {
        this.snackBar.openSnackBar('Document archived successfully', 'success');
        this.EventEmitted.emit(); // Emit event on successful rejection
      },
      (error) => {
        this.snackBar.openSnackBar(error?.error || 'archive failed', 'error');
      },
    );
  }
  openDocumentDialog(document: Document): void {
    this.dialog.open(DocumentDialogComponent, {
      width: '80%',
      height: '90%',
      data: {
        document,
      },
    });
  }
  deleteDialog(_id: string) {
    this.documentService.deleteDocument(_id).subscribe(
      () => {
        this.snackBar.openSnackBar('Document deleted successfully', 'success');
        this.EventEmitted.emit(); // Emit event on successful deletion
      },
      (error) => {
        this.snackBar.openSnackBar(error?.message || 'Delete failed', 'error');
      },
    );
  }
}
