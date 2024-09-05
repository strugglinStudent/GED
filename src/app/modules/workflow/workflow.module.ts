import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowAddEditComponent } from './workflow-add-edit/workflow-add-edit.component';
import { SharedModule } from '../../shared/shared.module';
import { WorkflowListComponent } from './workflow-list/workflow-list.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { ToUsernamePipe } from '../../shared/pipes/to-username.pipe';

@NgModule({
  declarations: [WorkflowAddEditComponent, WorkflowListComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    ToUsernamePipe,
  ],
})
export class WorkflowModule {}
