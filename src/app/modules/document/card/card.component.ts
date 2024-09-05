import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
// eslint-disable-next-line @typescript-eslint/no-redeclare
import { Document } from '../../../shared/models/document';
import { MatDialog } from '@angular/material/dialog';
import { DocumentDialogComponent } from '../document-dialog/document-dialog.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  exportAs: 'appCard',
})
export class CardComponent {
  protected readonly document = document;
  @Input() dataSource!: MatTableDataSource<Document>;
  @Output() EventEmitted = new EventEmitter<void>();
  selectedSort: string = 'uploadDate'; // Default sort field
  sortDirection: 'asc' | 'desc' = 'asc'; // Default sort direction
  sortOptions = [
    { value: 'id', viewValue: 'ID' },
    { value: 'originalName', viewValue: 'Name' },
    { value: 'size', viewValue: 'Size' },
    { value: 'status', viewValue: 'Status' },
    { value: 'uploadDate', viewValue: 'Upload Date' },
  ];
  constructor(
    private snackBar: SnackBarService,
    private dialog: MatDialog,
  ) {}
  sortData() {
    const directionMultiplier = this.sortDirection === 'asc' ? 1 : -1;

    this.dataSource.data.sort((a, b) => {
      const fieldA = a[this.selectedSort];
      const fieldB = b[this.selectedSort];
      if (fieldA > fieldB) return 1 * directionMultiplier;
      if (fieldA < fieldB) return -1 * directionMultiplier;
      return 0;
    });
  }
  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortData();
  }
  changeEmit() {
    this.EventEmitted.emit();
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
}
