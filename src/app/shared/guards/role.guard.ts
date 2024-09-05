import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  Route,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate, CanActivateChild, CanLoad {
  /**
   * Constructor
   */
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Can activate
   *
   * @param route
   * @param state
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
    return this._checkRole(route.data.expectedRoles, redirectUrl);
  }

  /**
   * Can activate child
   *
   * @param childRoute
   * @param state
   */
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
    return this._checkRole(childRoute.data.expectedRoles, redirectUrl);
  }

  /**
   * Can load
   *
   * @param route
   */
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    const redirectUrl = '/';
    return this._checkRole(route.data?.expectedRoles || [], redirectUrl);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Check the user's role against the expected roles
   *
   * @param expectedRoles
   * @param redirectUrl
   * @private
   */
  private _checkRole(expectedRoles: string[], redirectUrl: string): Observable<boolean> {
    return this.userService.get().pipe(
      switchMap((user) => {
        if (user) {
          // Check if the user is a SuperAdmin and the current URL is /explorer
          if (user.role === 'SuperAdmin' && redirectUrl === '/explorer') {
            this.router.navigate(['/company-dashboard']);
            return of(false); // Prevent access to the explorer route
          }

          if (expectedRoles.includes(user.role)) {
            return of(true);
          }
        }

        // Redirect to the sign-in page if the user does not have the required role
        this.router.navigate(['sign-in'], { queryParams: { redirectURL: redirectUrl } });
        return of(false);
      }),
    );
  }
}
