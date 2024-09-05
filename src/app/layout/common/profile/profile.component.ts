import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'app/shared/services/user.service';
import { User } from 'app/shared/models/user';
import {
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ImageCropperDialogComponent } from '../../../shared/components/image-cropper-dialog/image-cropper-dialog.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatRipple } from '@angular/material/core';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatCard } from '@angular/material/card';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
// eslint-disable-next-line @typescript-eslint/no-redeclare
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    SharedModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatRipple,
    MatListItem,
    MatNavList,
    MatCard,
  ],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: User;
  selectedIndex: number = 0;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialog: MatDialog,
    private snackBar: SnackBarService,
    private location: Location,
  ) {
    this.profileForm = this.fb.group({
      name: [''],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      language: [''],
      title: [''],
      country: [''],
      phoneNumber: [''],
      about: [''],
      password: [''],
      passwordRepeat: [''],
      setRandomPassword: [false],
      shouldChangePasswordOnNextLogin: [false],
    });
  }

  ngOnInit(): void {
    this.userService.user$.subscribe((user: User) => {
      this.user = user;
      this.profileForm.patchValue(user);
    });
    this.profileForm.get('setRandomPassword')?.valueChanges.subscribe((value) => {
      if (value) {
        this.profileForm.get('password')?.disable();
        this.profileForm.get('passwordRepeat')?.disable();
      } else {
        this.profileForm.get('password')?.enable();
        this.profileForm.get('passwordRepeat')?.enable();
      }
    });
  }

  updateAvatar() {
    const dialogRef = this.dialog.open(ImageCropperDialogComponent, {
      width: '800px',
      height: '500px',
      data: this.user.avatar,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.updateAvatar(result).subscribe((response: any) => {
          console.log('Avatar updated successfully', response);
          // Optionally refresh the user data
          this.userService.get().subscribe((user: User) => {
            this.user = user;
          });
        });
      }
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const formData = this.profileForm.value;
      this.userService.updateUser({ ...this.user, ...formData }).subscribe((response: User) => {
        this.snackBar.openSnackBar(`${this.user.userName} is updated successfully`, 'success');
        // Optionally, update local user data
        this.user = response;
      });
    }
  }

  onCancel() {
    this.profileForm.reset(this.user);
    this.location.back();
  }
}
