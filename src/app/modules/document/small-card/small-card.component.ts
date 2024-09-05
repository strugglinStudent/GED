import { Component, EventEmitter, Input, Output } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-redeclare
import { Document } from '../../../shared/models/document';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentDialogComponent } from '../document-dialog/document-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-small-card',

  templateUrl: './small-card.component.html',
  styleUrl: './small-card.component.scss',
})
export class SmallCardComponent {
  protected readonly document = document;
  @Input() dataSource!: MatTableDataSource<Document>;
  @Output() EventEmitted = new EventEmitter<any>();
  constructor(private dialog: MatDialog) {}
  openDocumentDialog(document: Document): void {
    this.dialog.open(DocumentDialogComponent, {
      width: '80%',
      height: '90%',
      data: {
        document,
      },
    });
  }
  changeEmit() {
    this.EventEmitted.emit();
  }
}
