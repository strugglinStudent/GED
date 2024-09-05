import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { UserGroupEditComponent } from './user-group-edit/user-group-edit.component';
import { UserGroupListComponent } from './user-group-list/user-group-list.component';
import { ToUsernamePipe } from '../../shared/pipes/to-username.pipe';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [UserGroupListComponent, UserGroupEditComponent],
  imports: [
    ToUsernamePipe,
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    SharedModule,
  ],
})
export class UserGroupModule {}
