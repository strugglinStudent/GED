import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from '../../../shared/models/company';
import { User } from '../../../shared/models/user';
import { CompanyService } from '../../../shared/services/company.service';
import { UserService } from '../../../shared/services/user.service';
import { SnackBarService } from '../../../shared/services/snack-bar.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
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
      console.log(this.data.user.password);
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { _id, email, password, userName } = this.data.user;
      this.userService.updateUser({ _id, email, password, userName }).subscribe(() => {
        this.dialogRef.close();
        this.snackBar.openSnackBar('User updated successfully', 'success');
      });
    } else {
      this.userService.addUser(this.data.user).subscribe(() => {
        this.dialogRef.close();
        this.snackBar.openSnackBar('User added successfully', 'success');
      });
    }
  }

  generateGenericPassword(): string {
    //return (this.data.user.password = `${this.data.user.userName}_${this.data.user.companyName}_Password1*`);
    const specialCharset = '!@#]{$;<:%^&*(_+}|,>[?.)';
    let x = Math.floor(Math.random() * specialCharset.length) + 1;
    return (this.data.user.password = (
      specialCharset.slice(x, x + Math.floor(Math.random() * 5)) +
      Math.random().toString(36).slice(4) +
      Math.random().toString(36).toUpperCase().slice(4)
    ).slice(0, 16));
  }
}
