import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User, UserGroup } from '../../../shared/models/user';
import { UserGroupService } from '../../../shared/services/user-group.service';
import { MatSidenav } from '@angular/material/sidenav';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-user-group-list',
  templateUrl: './user-group-list.component.html',
  styleUrl: './user-group-list.component.scss',
})
export class UserGroupListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'users', 'action'];
  dataSource = new MatTableDataSource<UserGroup>();
  userGroupId: string = '';
  allUsers: User[];
  constructor(
    private userGroupService: UserGroupService,
    private snackBar: SnackBarService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.loadUserGroups();
    this.userService.getUsers().subscribe((users) => {
      this.allUsers = users;
    });
  }

  loadUserGroups(): void {
    this.userGroupService.getUserGroups().subscribe({
      next: (data: UserGroup[]) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        this.snackBar.openSnackBar(err ? err?.message : 'Failed to load user groups', 'error');
      },
    });
  }
  editUserGroup(id: string): void {
    this.userGroupId = id;
    this.sidenav.open();
  }

  deleteUserGroup(id: string): void {
    this.userGroupService.deleteUserGroup(id).subscribe({
      next: () => {
        this.loadUserGroups(); // Reload the table after deletion
      },
      error: (err) => {
        this.snackBar.openSnackBar(err ? err?.message : 'Failed to delete user group', 'error');
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

  addUserGroup() {
    this.userGroupId = '';
    this.sidenav.open();
  }
}
