import { Component, OnInit } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { DocumentService } from 'app/shared/services/document.service';
import { environment } from 'environments/environment';
// eslint-disable-next-line @typescript-eslint/no-redeclare
import { Document } from 'app/shared/models/document';
@Component({
  selector: 'app-document-dashboard',
  templateUrl: './document-dashboard.component.html',
  styleUrls: ['./document-dashboard.component.scss'],
  standalone: true,
  imports: [
    MatHeaderRow,
    MatRow,
    MatCell,
    MatHeaderCell,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatRowDef,
    MatHeaderRowDef,
    MatTable,
  ],
})
export class DocumentDashboardComponent implements OnInit {
  displayedColumns: string[] = ['image', 'content'];
  dataSource = new MatTableDataSource<Document>([]);

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.documentService.getAllDocuments().subscribe(
      (documents: Document[]) => {
        this.dataSource.data = documents.map((document) => ({
          ...document,
          path: `${environment.api}/${document.path}`,
        }));
      },
      () => {
        console.error('Failed to load documents');
      },
    );
  }
}
