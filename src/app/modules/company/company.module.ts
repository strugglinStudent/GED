import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompanyService } from 'app/shared/services/company.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CompanyDialogComponent } from './company-dialog/company-dialog.component';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CompanyDialogComponent, CompanyDashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    SharedModule,
  ],
  providers: [CompanyService],
})
export class CompanyModule {}
