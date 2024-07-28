import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Company } from '../../../shared/models/company';
import { User } from '../../../shared/models/user';
import { CompanyService } from '../../../shared/services/company.service';
import { UserService } from '../../../shared/services/user.service';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  standalone: true,
  imports: [SharedModule, MatDialogActions, MatDialogContent, MatDialogTitle],
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent {
  companies: Company[] = [];
  data: {
    type: string;
    user: User;
    companyName: string;
    isSuperAdmin: boolean;
  };

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private companyService: CompanyService,
    private userService: UserService,
    private snackBar: SnackBarService, // Inject SnackBarService
  ) {
    this.data = dialogData;
    if (this.data.type !== 'delete') {
      if (this.data.isSuperAdmin)
        this.companyService.getCompanies().subscribe((companies) => {
          this.companies = companies;
        });
      if (this.data.type === 'add') {
        this.data.user = new User();
        this.data.user.role = 'User'; // Set default value if role is not defined
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
  onDelete(): void {
    this.dialogRef.close(true);
  }
  saveUser(): void {
    if (this.data.type === 'edit') {
      this.userService.updateUser(this.data.user).subscribe(
        () => {
          this.dialogRef.close();
          this.snackBar.openSnackBar('User updated successfully', 'success');
        },
        (error) => {
          const errorMessage = error?.error || 'Update failed';
          this.snackBar.openSnackBar(errorMessage, 'error');
        },
      );
    } else {
      this.userService.addUser(this.data.user).subscribe(
        () => {
          this.dialogRef.close();
          this.snackBar.openSnackBar('User added successfully', 'success');
        },
        (error) => {
          const errorMessage = error.error || 'Creation failed';
          this.snackBar.openSnackBar(errorMessage, 'error');
        },
      );
    }
  }

  generateGenericPassword(): string {
    if (this.data.type === 'add') {
      if (this.data.user.userName && this.data.user.companyName) {
        return (this.data.user.password = `${this.data.user.userName}_${this.data.user.companyName}_Password1*`);
      }
      if (this.data.user.userName && !this.data.isSuperAdmin)
        return (this.data.user.password = `${this.data.user.userName}_${this.data.companyName}_Password1*`);
    }
  }
}
