import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { NoAuthGuard } from './noAuth.guard';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NoAuthGuard', () => {
  let noAuthGuard: NoAuthGuard;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [NoAuthGuard, AuthService],
    });

    noAuthGuard = TestBed.inject(NoAuthGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should allow access if user is not authenticated', (done) => {
    spyOn(authService, 'isAuthenticated').and.returnValue(of(false));

    const activatedRouteSnapshot: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const routerStateSnapshot: RouterStateSnapshot = {} as RouterStateSnapshot;

    noAuthGuard.canActivate(activatedRouteSnapshot, routerStateSnapshot).subscribe((result) => {
      expect(result).toBe(true);
      done();
    });
  });

  it('should prevent access and redirect to the root if user is authenticated for canActivateChild', (done) => {
    spyOn(authService, 'isAuthenticated').and.returnValue(of(true));
    const serviceRouter = TestBed.inject(Router);
    const spyNavigation = spyOn(serviceRouter, 'navigate').and.returnValue(Promise.resolve(true));
    const childRoute: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const routerStateSnapshot: RouterStateSnapshot = {} as RouterStateSnapshot;

    noAuthGuard.canActivateChild(childRoute, routerStateSnapshot).subscribe((result) => {
      expect(result).toBe(false);
      expect(spyNavigation).toHaveBeenCalledWith(['explorer']);
      done();
    });
  });

  it('should prevent access if user is authenticated for canActivate', (done) => {
    spyOn(authService, 'isAuthenticated').and.returnValue(of(true));
    const serviceRouter = TestBed.inject(Router);
    const spyNavigation = spyOn(serviceRouter, 'navigate').and.returnValue(Promise.resolve(true));
    const activatedRouteSnapshot: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const routerStateSnapshot: RouterStateSnapshot = {} as RouterStateSnapshot;

    noAuthGuard.canActivate(activatedRouteSnapshot, routerStateSnapshot).subscribe((result) => {
      expect(result).toBe(false);
      expect(spyNavigation).toHaveBeenCalledWith(['explorer']);
      done();
    });
  });

  it('should allow access if user is not authenticated for canActivateChild', (done) => {
    spyOn(authService, 'isAuthenticated').and.returnValue(of(false));

    const activatedRouteSnapshot: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const routerStateSnapshot: RouterStateSnapshot = {} as RouterStateSnapshot;

    noAuthGuard
      .canActivateChild(activatedRouteSnapshot, routerStateSnapshot)
      .subscribe((result) => {
        expect(result).toBe(true);
        done();
      });
  });
});
