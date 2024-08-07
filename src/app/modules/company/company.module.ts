import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { CompanyService } from 'app/shared/services/company.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    CreateCompanyComponent,
    //EditCompanyComponent,
    //CompanyDashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    SharedModule,
  ],
  providers: [CompanyService],
})
export class CompanyModule {}
