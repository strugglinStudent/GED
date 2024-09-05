import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserSettingsComponent } from '../user-settings/user-settings.component';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatSidenav } from '@angular/material/sidenav';
import { NgFor, NgIf } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UserService } from '../../../shared/services/user.service';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLine } from '@angular/material/core';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    UserSettingsComponent,
    MatListItem,
    MatNavList,
    MatSidenav,
    RouterLink,
    NgFor,
    MatListModule,
    MatSidenavModule,
    NgIf,
    MatIcon,
    MatIconButton,
    MatExpansionModule,
    MatLine,
  ],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  @Output() itemClicked = new EventEmitter<void>();
  onItemClicked() {
    this.itemClicked.emit();
  }
  constructor(private userService: UserService) {}

  shouldDisplay(roles: string[]): boolean {
    if (this.userService.isSuperAdmin() && roles.includes('SuperAdmin')) return true;
    if (this.userService.isAdmin() && roles.includes('Admin')) return true;
    return this.userService.isUser() && roles.includes('User');
  }
  // @ts-ignore
  navItems = [
    {
      name: 'users management',
      roles: ['Admin', 'SuperAdmin'],
      expandable: true,
      expanded: true,
      children: [
        {
          link: '/users-dashboard',
          name: `users Dashboard`,
          roles: ['Admin', 'SuperAdmin'],
        },
        {
          name: 'workflow management',
          link: '/workflow-management',
          roles: ['Admin'],
        },
        {
          name: 'user tasks',
          link: 'users-tasks',
          roles: ['Admin'],
        },
      ],
    },
    {
      name: 'Company Dashboard',
      link: '/company-dashboard',
      roles: ['SuperAdmin'],
      expandable: false,
    },

    {
      name: 'document Management',
      expandable: true,
      expanded: true,
      roles: ['User', 'Admin'],
      children: [
        {
          name: 'document Dashboard',
          link: '/document-management',
          roles: ['User', 'Admin'],
        },
        {
          name: 'document content',
          link: '/document-content',
          roles: ['User', 'Admin'],
        },
        {
          name: 'document distribution',
          link: '/document-distribution',
          roles: ['Admin'],
        },
        {
          name: 'document archive',
          link: '/archive',
          roles: ['Admin'],
        },
      ],
    },

    {
      name: 'Setting',
      link: '/profile',
      roles: ['User', 'Admin', 'SuperAdmin'],
    },
  ];
}
