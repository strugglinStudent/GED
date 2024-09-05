import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/user';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { TruncateNamePipe } from '../../../shared/pipes/truncate-name.pipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-dashboard',
  providers: [TruncateNamePipe],
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.scss'],
})
export class UsersDashboardComponent implements OnInit {
  protected users: User[] = [];
  private currentUser: User;
  public displayedColumns: string[];
  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private snackBar: SnackBarService,
    private activatedRoute: ActivatedRoute,
  ) {}

  openDialog(type: string, user?: User): void {
    this.dialog
      .open(UserDialogComponent, {
        width: type === 'delete' ? '600px' : '800px',
        data: {
          type: type,
          user: user,
          isSuperAdmin: this.userService.isSuperAdmin(),
          companyName: this.currentUser.companyName,
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
    this.activatedRoute.queryParams.subscribe((params) => {
      const searchQuery = params['search'];
      if (searchQuery) {
        console.log(searchQuery);
      }
    });
    this.userService.user$.subscribe((user) => {
      this.currentUser = user;
      this.displayedColumns = this.userService.isSuperAdmin()
        ? ['avatar', '_id', 'userName', 'email', 'role', 'companyName', 'updatedAt', 'actions']
        : ['avatar', '_id', 'userName', 'email', 'role', 'updatedAt', 'actions'];
    });
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
