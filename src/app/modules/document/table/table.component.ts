import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
// eslint-disable-next-line @typescript-eslint/no-redeclare
import { Document } from '../../../shared/models/document';
import { DocumentDialogComponent } from '../document-dialog/document-dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'image',
    'id',
    'originalName',
    'size',
    'status',
    'uploadDate',
    'actions',
  ];

  constructor(
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() dataSource: MatTableDataSource<Document>;
  @Output() EventEmitted = new EventEmitter<void>();

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
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
