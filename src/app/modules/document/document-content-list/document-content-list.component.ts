import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
// eslint-disable-next-line @typescript-eslint/no-redeclare
import { Content } from '../../../shared/models/document';
import { DatePipe, NgForOf } from '@angular/common';
import { DocumentService } from '../../../shared/services/document.service';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HighlightPipe } from '../../../shared/pipes/highlight.pipe';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatLabel } from '@angular/material/select';
import { SharedModule } from '../../../shared/shared.module';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-document-content-list',
  templateUrl: './document-content-list.component.html',
  styleUrls: ['./document-content-list.component.scss'],
})
export class DocumentContentListComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private documentService: DocumentService,
    private snackBar: SnackBarService,
    private _liveAnnouncer: LiveAnnouncer,
    private _activatedRoute: ActivatedRoute,
  ) {}
  allColumns = [
    { name: 'title', isVisible: true },
    { name: 'date', isVisible: true },
    { name: 'orderNumber', isVisible: true },
    { name: 'storeName', isVisible: true },
    { name: 'address', isVisible: true },
    { name: 'tax_identification_number', isVisible: true },
    { name: 'billed_to_name', isVisible: true },
    { name: 'billed_to_address', isVisible: true },
    { name: 'delivery_company', isVisible: true },
    { name: 'delivery_method', isVisible: true },
    { name: 'delivery_fee', isVisible: true },
    { name: 'delivery_currency', isVisible: true },
    { name: 'client_type', isVisible: true },
    { name: 'sale_type', isVisible: true },
    { name: 'items', isVisible: true },
    { name: 'subtotal_ht_amount', isVisible: true },
    { name: 'subtotal_ht_currency', isVisible: true },
    { name: 'tax_rate', isVisible: true },
    { name: 'tax_amount', isVisible: true },
    { name: 'tax_currency', isVisible: true },
    { name: 'total_ttc_amount', isVisible: true },
    { name: 'total_ttc_payment_method', isVisible: true },
    { name: 'total_ttc_currency', isVisible: true },
    { name: 'contact_info', isVisible: true },
    { name: 'siret', isVisible: true },
    { name: 'naf', isVisible: true },
    { name: 'tva', isVisible: true },
  ];

  get displayedColumns(): string[] {
    return this.allColumns.filter((column) => column.isVisible).map((column) => column.name);
  }
  dataSource = new MatTableDataSource<Content>();

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe((params) => {
      const searchQuery = params['search'];
      if (searchQuery) {
        this.performSearch(searchQuery);
      }
    });
    this.dataSource.filterPredicate = (data: Content, filter: string) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.includes(filter);
    };
    this.documentService.getContents().subscribe((data: Content[]) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
    });
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  toggleColumnVisibility(column: { name: string; isVisible: boolean }) {
    column.isVisible = !column.isVisible;
    this._liveAnnouncer.announce('Columns updated');
  }
  private performSearch(searchQuery: string) {
    this.dataSource.filter = searchQuery;
  }
}
