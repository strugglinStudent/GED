import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
// eslint-disable-next-line @typescript-eslint/no-redeclare
import { DisplayMode, Document } from '../../../shared/models/document';
import { DocumentService } from '../../../shared/services/document.service';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-document-archive',
  templateUrl: './document-archive.component.html',
  styleUrl: './document-archive.component.scss',
})
export class DocumentArchiveComponent implements OnInit {
  displayMode: 'table' | 'smallCards' | 'largeCards' = 'table';
  dataSource: MatTableDataSource<Document> = new MatTableDataSource<Document>();
  constructor(
    private documentService: DocumentService,
    private snackBar: SnackBarService,
  ) {}
  ngOnInit(): void {
    this.loadDocuments();
  }
  loadDocuments(): void {
    this.documentService.getArchivedDocuments().subscribe((documents: Document[]) => {
      this.dataSource.data = documents.map((document) => ({
        ...document,
        path: `${environment.api}/${document.path}`,
      }));
    });
  }

  protected readonly DisplayMode = DisplayMode;
}
