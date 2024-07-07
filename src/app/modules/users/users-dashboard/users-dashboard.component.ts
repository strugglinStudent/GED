import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/user';
import { SharedModule } from '../../../shared/shared.module';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { MatCardHeader } from '@angular/material/card';

@Component({
  selector: 'app-users-dashboard',
  standalone: true,
  imports: [
    SharedModule,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatCardHeader,
  ],
  templateUrl: './users-dashboard.component.html',
  styleUrl: './users-dashboard.component.scss',
})
export class UsersDashboardComponent implements OnInit {
  users: User[] = [];
  currentUser: User;
  isSuperAdmin: boolean;
  public displayedColumns: string[];
  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private snackBar: SnackBarService,
  ) {}
  companyName: string;

  openDialog(type: string, user?: User): void {
    this.dialog
      .open(UserDialogComponent, {
        width: type === 'delete' ? '600px' : '800px',
        data: {
          type: type,
          user: user,
          isSuperAdmin: this.isSuperAdmin,
          companyName: this.companyName,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === true) {
          this.userService.deleteUser(user._id).subscribe(
            () => {
              this.loadUsers();
            },
            (error) => {
              const errorMessage = error?.error?.message || 'Delete failed';
              this.snackBar.openSnackBar(errorMessage, 'error');
            },
          );
        }
        if (type !== 'delete') {
          this.loadUsers();
        }
      });
  }

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.currentUser = user;
      this.companyName = user.companyName;
      this.displayedColumns = this.userService.isSuperAdmin(this.currentUser)
        ? ['userName', 'email', 'password', 'role', 'companyName', 'actions']
        : ['userName', 'email', 'password', 'actions'];
    });
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        const errorMessage = error?.error || 'loading failed';
        this.snackBar.openSnackBar(errorMessage, 'error');
      },
    );
  }
}
