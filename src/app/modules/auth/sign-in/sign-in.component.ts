import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { NgForm } from '@angular/forms';
import { SnackBarService } from '../../../shared/services/snack-bar.service';

@Component({
  selector: 'app-auth-sign-in',
  templateUrl: './sign-in.component.html',
})
export class AuthSignInComponent implements OnInit {
  loading: boolean;
  user = new User();

  environment: any = environment;
  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: SnackBarService,
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email');
      localStorage.removeItem('email');
    }
  }
  signIn(signInNgForm: NgForm): void {
    if (signInNgForm.valid) {
      this.loading = true;
      this.authService.signIn(this.user).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('refreshToken', res.refreshToken);
          this.loading = false;
          this.authService.authenticationSubject.next(true);
          this.router.navigate(['/explorer']).then(() => {
            window.location.reload();
          });
        },
        error: () => {
          this.loading = false;
          this._snackBar.openSnackBar('verifier le mot de passe ou email', 'error');
        },
      });
    }
  }
}
