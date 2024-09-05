import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'app/shared/services/auth.service';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { SnackBarService } from '../../../shared/services/snack-bar.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild('forgotPasswordNgForm') forgotPasswordNgForm: NgForm;
  forgotPasswordForm: UntypedFormGroup;
  private loading: boolean;
  constructor(
    private _authService: AuthService,
    private _formBuilder: UntypedFormBuilder,
    private _snackBar: SnackBarService,
  ) {}

  ngOnInit(): void {
    // Create the form
    this.forgotPasswordForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      companyName: ['', Validators.required],
    });
  }

  sendResetLink(): void {
    // Return if the form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    // Forgot password
    this._authService
      .forgotPassword(this.forgotPasswordForm.value)
      .pipe(
        finalize(() => {
          // Re-enable the form
          this.forgotPasswordForm.enable();

          // Reset the form
          this.forgotPasswordNgForm.resetForm();
        }),
      )
      .subscribe(
        () => {
          this.loading = false;
          this._snackBar.openSnackBar(
            "Password reset sent! You'll receive an email if you are registered on our system.",
            'success',
          );
        },
        () => {
          this.loading = false;
        },
      );
  }
}
