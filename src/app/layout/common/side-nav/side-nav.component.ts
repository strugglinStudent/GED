import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserSettingsComponent } from '../user-settings/user-settings.component';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatSidenav } from '@angular/material/sidenav';
import { NgFor, NgIf } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { User } from 'app/shared/models/user';
import { UserService } from '../../../shared/services/user.service';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

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
  ],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Output() itemClicked = new EventEmitter<void>();

  onItemClicked() {
    this.itemClicked.emit();
  }
  user: User;
  navItems = [
    {
      name: 'Company Dashboard',
      link: '/company-dashboard',
      roles: ['SuperAdmin'],
      expanded: false,
      children: [],
    },
    {
      name: 'Users Dashboard',
      link: '/users-dashboard',
      roles: ['Admin', 'SuperAdmin'],
      expanded: false,
      children: [
        {
          name: 'user groups',
          link: '',
          roles: ['Admin'],
        },
        {
          name: 'user tasks',
          link: '',
          roles: ['Admin'],
        },
      ],
    },

    {
      name: 'File Management',
      link: '/file-management',
      expanded: false,
      children: [
        {
          name: 'Uploaded Files',
          link: '/file-management/upload-files',
          roles: ['User', 'Admin', 'SuperAdmin'],
        },
      ],
      roles: ['User', 'Admin', 'SuperAdmin'],
    },
  ];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  shouldDisplay(roles: string[]): boolean {
    if (!this.user) return false;
    if (this.userService.isSuperAdmin(this.user) && roles.includes('SuperAdmin')) return true;
    if (this.userService.isAdmin(this.user) && roles.includes('Admin')) return true;
    return this.userService.isUser(this.user) && roles.includes('User');
  }
}
