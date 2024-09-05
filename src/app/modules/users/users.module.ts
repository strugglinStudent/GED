import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { TruncateNamePipe } from '../../shared/pipes/truncate-name.pipe';
import { MatBadgeModule } from '@angular/material/badge';
import { UsersDashboardComponent } from './users-dashboard/users-dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
@NgModule({
  declarations: [UsersDashboardComponent, UserDialogComponent],
  imports: [
    TruncateNamePipe,
    CommonModule,
    SharedModule,
    MatTableModule,
    MatCardModule,
    MatBadgeModule,
    MatDialogModule,
  ],
  exports: [],
})
export class UsersModule {}
