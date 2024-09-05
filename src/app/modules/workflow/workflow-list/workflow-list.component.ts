import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User, Workflow } from '../../../shared/models/user';
import { WorkflowService } from '../../../shared/services/workflow.service';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { UserService } from '../../../shared/services/user.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrl: './workflow-list.component.scss',
})
export class WorkflowListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'users', 'action'];
  dataSource = new MatTableDataSource<Workflow>();
  workflowId: string = '';
  allUsers: User[];
  constructor(
    private workflowService: WorkflowService,
    private snackBar: SnackBarService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.loadWorkflows();
    this.userService.getUsers().subscribe((users) => {
      this.allUsers = users;
    });
  }

  loadWorkflows(): void {
    this.workflowService.getWorkflows().subscribe({
      next: (data: Workflow[]) => {
        this.dataSource.data = data;
      },
    });
  }
  editWorkflow(id: string): void {
    this.workflowId = id;
    this.sidenav.open();
  }

  deleteWorkflow(id: string): void {
    this.workflowService.deleteWorkflow(id).subscribe({
      next: () => {
        this.loadWorkflows(); // Reload the table after deletion
      },
    });
  }
  // Method to close the sidebar
  @ViewChild('sidenav') sidenav: MatSidenav;
  closeSidebar() {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }

  addWorkflow() {
    this.workflowId = '';
    this.sidenav.open();
  }
}
