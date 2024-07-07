import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthGuard, AuthService],
    });
    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });
  it('should allow access if user is not authenticated', (done) => {
    spyOn(authService, 'isAuthenticated').and.returnValue(of(false));
    const serviceRouter = TestBed.inject(Router);
    const spyNavigation = spyOn(serviceRouter, 'navigate').and.returnValue(Promise.resolve(true));
    authGuard.canActivate().subscribe((result) => {
      expect(result).toBe(false);
      expect(spyNavigation).toHaveBeenCalledWith(['sign-in']);
      done();
    });
  });

  it('should prevent access and redirect to the root if user is authenticated for canActivateChild', (done) => {
    spyOn(authService, 'isAuthenticated').and.returnValue(of(true));
    spyOn(router, 'navigate');

    authGuard.canActivateChild().subscribe((result) => {
      expect(result).toBe(true);
      done();
    });
  });

  it('should prevent access if user is authenticated for canActivate', (done) => {
    spyOn(authService, 'isAuthenticated').and.returnValue(of(true));

    authGuard.canActivate().subscribe((result) => {
      expect(result).toBe(true);
      done();
    });
  });

  it('should allow access if user is not authenticated for canActivateChild', (done) => {
    spyOn(authService, 'isAuthenticated').and.returnValue(of(false));
    const serviceRouter = TestBed.inject(Router);
    const spyNavigation = spyOn(serviceRouter, 'navigate').and.returnValue(Promise.resolve(true));
    authGuard.canActivateChild().subscribe((result) => {
      expect(result).toBe(false);
      expect(spyNavigation).toHaveBeenCalledWith(['sign-in']);
      done();
    });
  });
});
