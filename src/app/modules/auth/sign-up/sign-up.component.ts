import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/services/auth.service';
import { environment } from '../../../../environments/environment';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  newUser = {
    name: '',
    company: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: SnackBarService,
  ) {}

  signUp(signUpNgForm: any) {
    if (signUpNgForm.valid && this.newUser.password === this.newUser.confirmPassword) {
      this.loading = true;
      this.authService.signUp(this.newUser).subscribe({
        next: () => {
          this.loading = false;
          this._snackBar.openSnackBar(
            'Your account has been created and is pending admin approval.',
            'success',
          );

          // Optionally, navigate to a different page or show a specific UI message
          // this.router.navigate(['/confirmation']); // Uncomment if you want to navigate to a confirmation page
        },
        error: () => {
          this.loading = false;
        },
      });
    }
  }

  protected readonly environment = environment;
}
