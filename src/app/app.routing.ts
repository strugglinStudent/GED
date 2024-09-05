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
import { DocumentDashboardComponent } from './modules/document/document-dashboard/document-dashboard.component';
import { ProfileComponent } from './layout/common/profile/profile.component';
import { UserGroupListComponent } from './modules/user-group/user-group-list/user-group-list.component';
import { DocumentDistributionComponent } from './modules/document/document-distribution/document-distribution.component';
import { DocumentArchiveComponent } from './modules/document/document-archive/document-archive.component';
import { DocumentContentListComponent } from './modules/document/document-content-list/document-content-list.component';
import { WorkflowListComponent } from './modules/workflow/workflow-list/workflow-list.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in',
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    data: { layout: 'sign-in' },
    children: [
      {
        path: 'sign-in',
        component: AuthSignInComponent,
        data: { breadcrumb: 'Sign In', animation: 'sign-in' },
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
      {
        path: 'confirmation',
        component: ConfirmationComponent,
        data: { layout: 'empty' },
      },
    ],
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: { layout: 'application' },
    children: [
      {
        path: 'explorer',
        canActivate: [RoleGuard],
        data: { expectedRoles: ['Admin', 'User'] },
        loadChildren: () =>
          import('app/modules/explorer/explorer.module').then((m) => m.ExplorerModule),
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'company-dashboard',
        component: CompanyDashboardComponent,
        canActivate: [RoleGuard],
        data: { expectedRoles: ['SuperAdmin'] },
      },
      {
        path: 'users-dashboard',
        component: UsersDashboardComponent,
        canActivate: [RoleGuard],
        data: { expectedRoles: ['Admin', 'SuperAdmin'] },
      },
      {
        path: 'group-management',
        component: UserGroupListComponent,
        canActivate: [RoleGuard],
        data: { expectedRoles: ['Admin'] },
      },
      {
        path: 'workflow-management',
        component: UserGroupListComponent,
        canActivate: [RoleGuard],
        data: { expectedRoles: ['Admin'] },
      },
      {
        path: 'document-distribution',
        component: DocumentDistributionComponent,
        canActivate: [RoleGuard],
        data: { expectedRoles: ['Admin', 'User'] },
      },
      {
        path: 'archive',
        component: DocumentArchiveComponent,
        canActivate: [RoleGuard],
        data: { expectedRoles: ['Admin'] },
      },
      {
        path: 'document-management',
        component: DocumentDashboardComponent,
        canActivate: [RoleGuard],
        data: { expectedRoles: ['Admin', 'User'] },
      },
      {
        path: 'document-content',
        component: DocumentContentListComponent,
        canActivate: [RoleGuard],
        data: { expectedRoles: ['Admin', 'User'] },
      },
    ],
  },
  {
    path: 'sign-out',
    canActivate: [AuthGuard],
    loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes'),
    data: { layout: 'sign-in' },
  },
  { path: '**', redirectTo: '' },
];
