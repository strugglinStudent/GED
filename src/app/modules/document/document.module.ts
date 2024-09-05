import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { TruncateNamePipe } from '../../shared/pipes/truncate-name.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DocumentActionComponent } from './document-action/document-action.component';
import { CardComponent } from './card/card.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DocumentProgressComponent } from './Document-progress/document-progress.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbar } from '@angular/material/toolbar';
import { SmallCardComponent } from './small-card/small-card.component';
import { TableComponent } from './table/table.component';
import { SharedModule } from '../../shared/shared.module';
import { DocumentArchiveComponent } from './document-archive/document-archive.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { HighlightPipe } from '../../shared/pipes/highlight.pipe';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { DocumentContentListComponent } from './document-content-list/document-content-list.component';
import { DocumentDashboardComponent } from './document-dashboard/document-dashboard.component';
import { FileSizePipe } from '../../shared/pipes/file-size.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { DocumentDialogComponent } from './document-dialog/document-dialog.component';
import { DocumentDistributionComponent } from './document-distribution/document-distribution.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
  declarations: [
    CardComponent,
    DocumentActionComponent,
    DocumentArchiveComponent,
    DocumentContentListComponent,
    DocumentDashboardComponent,
    DocumentDialogComponent,
    DocumentDistributionComponent,
    DocumentProgressComponent,
    SmallCardComponent,
    TableComponent,
  ],
  imports: [
    MatToolbar,
    TruncateNamePipe,
    HighlightPipe,
    FileSizePipe,
    CommonModule,
    SharedModule,
    ScrollingModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatDialogModule,
    MatExpansionModule,
    MatMenuModule,
    MatSelectModule,
    MatOptionModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatChipsModule,
  ],
  exports: [DocumentDashboardComponent],
})
export class DocumentModule {}
