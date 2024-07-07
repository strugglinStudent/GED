import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthSignInComponent } from './sign-in.component';
import { of, throwError } from 'rxjs';
import { NgForm, UntypedFormBuilder } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { CognitoUser } from 'amazon-cognito-identity-js';

describe('AuthSignInComponent', () => {
  let component: AuthSignInComponent;
  let fixture: ComponentFixture<AuthSignInComponent>;
  let authService: AuthService;
  beforeEach(async () => {
    await TestBed.overrideComponent(AuthSignInComponent, { set: { template: '' } });
    await TestBed.configureTestingModule({
      declarations: [AuthSignInComponent],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: () => of(true),
            sendPreferences: ([]) => of(null),
            authenticationSubject: { next: () => true },
          },
        },
        {
          provide: Router,
          useValue: { navigate: () => {} },
        },
        UntypedFormBuilder,
        MatSnackBar,
        SnackBarService,
      ],
    }).compileComponents();
    localStorage.setItem('sendPreferences', 'true');
    fixture = TestBed.createComponent(AuthSignInComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call onInit method', () => {
    localStorage.setItem('email', 'test@example.com');
    component.ngOnInit();
    expect(component.user.email).toEqual('test@example.com');
  });
  it('should call signIn method with form values when form is valid', () => {
    spyOn(authService, 'signIn').and.returnValue(of({} as CognitoUser));
    const email = 'test@example.com';
    const password = 'test1234';
    component.user = { email, password };
    component.signIn({ valid: true } as NgForm);
    expect(authService.signIn).toHaveBeenCalledWith({
      email,
      password,
    });
    expect(component.loading).toBeFalse();
  });

  it('should call signIn method with form values when form is not valid', () => {
    spyOn(authService, 'signIn').and.returnValue(of({} as CognitoUser));
    const email = 'test@example.com';
    const password = 'test1234';
    component.user = { email, password };
    component.signIn({ valid: false } as NgForm);
    expect(authService.signIn).not.toHaveBeenCalledWith({
      email,
      password,
    });
    expect(component.loading).toBeFalsy();
  });

  it('should call signIn method with error', () => {
    spyOn(authService, 'signIn').and.returnValue(
      throwError(() => {
        return {
          message: 'Error',
        };
      }),
    );
    const email = 'test@example.com';
    const password = 'test1234';
    component.user = { email, password };
    const snackBarService: SnackBarService = TestBed.inject(SnackBarService);
    const spy = spyOn(snackBarService, 'openSnackBar');
    component.signIn({ valid: true } as NgForm);
    expect(spy).toHaveBeenCalledWith('Error', 'error');
    expect(component.loading).toBeFalse();
  });

  it('should call confirmSignUp method and sendPreferences', () => {
    localStorage.removeItem('sendPreferences');
    spyOn(authService, 'sendPreferences').and.returnValue(of({} as null));
    component.signIn({ valid: true } as NgForm);
    expect(component.loading).toBeFalse();
  });
});
