import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { explorerRoutes } from './explorer.routing';
import { ExplorerComponent } from './explorer.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ScrollableDirective } from '../../shared/directives/scrollable.directive';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { FileSizePipe } from 'app/shared/pipes/file-size.pipe';
import { TruncateNamePipe } from '../../shared/pipes/truncate-name.pipe';
import { DocumentUploadComponent } from '../document/Document-upload/document-upload.component';
import { DocumentDashboardComponent } from '../document/document-dashboard/document-dashboard.component';

LOAD_WASM().subscribe();
@NgModule({
  declarations: [ExplorerComponent, ScrollableDirective],
  imports: [
    NgxScannerQrcodeModule,
    CommonModule,
    RouterModule.forChild(explorerRoutes),
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDatepickerModule,
    MatSliderModule,
    SharedModule,
    FormsModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatTooltipModule,
    NgxMaterialTimepickerModule,
    CdkDrag,
    CdkDragHandle,
    MatIcon,
    MatButton,
    MatCardContent,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    SharedModule,
    FileSizePipe,
    TruncateNamePipe,
    DocumentUploadComponent,
    DocumentDashboardComponent,
  ],
  exports: [],
})
export class ExplorerModule {}
