import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'app/shared/services/auth.service';
import { SnackBarService } from 'app/shared/services/snack-bar.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  loading = false;
  passwordMismatch = false;
  private token: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: SnackBarService,
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];

    this.resetPasswordForm = this.formBuilder.group(
      {
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.passwordMatchValidator,
      },
    );
  }

  resetPassword(): void {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.loading = true;

    const password = this.resetPasswordForm.get('password').value;

    this.authService.resetPassword(this.token, password).subscribe(
      () => {
        this.loading = false;
        this.snackBar.openSnackBar(
          'Password reset successful! You can now sign in with your new password.',
          'success',
        );
        this.router.navigate(['/sign-in']);
      },
      () => {
        this.loading = false;
        this.snackBar.openSnackBar('Failed to reset password. Please try again later.', 'error');
      },
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password').value;
    const confirmPassword = form.get('confirmPassword').value;

    if (password !== confirmPassword) {
      form.get('confirmPassword').setErrors({ passwordMismatch: true });
    } else {
      return null;
    }
  }
}
