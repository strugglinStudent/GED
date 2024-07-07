import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthSignInComponent } from './modules/auth/sign-in/sign-in.component';
import { NoAuthGuard } from './shared/guards/noAuth.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { RoleGuard } from './shared/guards/role.guard';
import { ForgotPasswordComponent } from './modules/auth/forgot-password/forgot-password.component';
import { SignUpComponent } from './modules/auth/sign-up/sign-up.component';
import { ConfirmationComponent } from './modules/auth/confirmation/confirmation.component';
import { CompanyDashboardComponent } from './modules/company/company-dashboard/company-dashboard.component';
import { UsersDashboardComponent } from './modules/users/users-dashboard/users-dashboard.component';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';

// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in',
  },
  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'sign-in',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'sign-in',
      },
      {
        path: 'sign-in',
        data: {
          breadcrumb: 'c',
          animation: 'sign-in',
        },
        component: AuthSignInComponent,
        loadChildren: () => import('app/modules/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        loadChildren: () => import('app/modules/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'reset-password', // Add the reset-password route
        component: ResetPasswordComponent,
        loadChildren: () => import('app/modules/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        loadChildren: () => import('app/modules/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'application',
    },
    children: [
      {
        path: 'explorer',
        loadChildren: () =>
          import('app/modules/explorer/explorer.module').then((m) => m.ExplorerModule),
      },
    ],
  },
  {
    path: 'confirmation',
    component: ConfirmationComponent,
    data: {
      layout: 'empty',
    },
  },
  {
    path: 'sign-out',
    canActivate: [AuthGuard],
    loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes'),
    data: {
      layout: 'sign-in',
    },
  },
  {
    path: 'company-dashboard',
    canActivate: [RoleGuard],
    data: {
      expectedRoles: ['SuperAdmin'],
      layout: 'application',
    },
    component: LayoutComponent,
    children: [{ path: '', component: CompanyDashboardComponent }],
  },
  {
    path: 'users-dashboard',
    canActivate: [RoleGuard],
    data: {
      expectedRoles: ['Admin', 'SuperAdmin'],
      layout: 'application',
    },
    component: LayoutComponent,
    children: [{ path: '', component: UsersDashboardComponent }],
  },
  {
    path: 'file-management',
    canActivate: [AuthGuard],
    data: {
      layout: 'application',
    },
    component: LayoutComponent,
    children: [
      // Add routes for the File Management here
    ],
  },
  { path: '**', redirectTo: '' },
];
