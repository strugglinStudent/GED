import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const expectedRoles = route.data.expectedRoles;

    return this.userService.get().pipe(
      map((user) => {
        if (user && expectedRoles.includes(user.role)) {
          return true;
        }
        this.router.navigate(['/sign-in']);
        return false;
      }),
    );
  }
}
