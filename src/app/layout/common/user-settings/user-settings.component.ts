import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'app/shared/services/user.service';
import { User } from 'app/shared/models/user';
import { Subject, takeUntil } from 'rxjs';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { NgClass, NgIf } from '@angular/common';
import { BooleanInput } from '@angular/cdk/coercion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [
    MatDivider,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    NgIf,
    MatMenuTrigger,
    NgClass,
    MatButton,
  ],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss',
})
export class UserSettingsComponent implements OnInit, OnDestroy {
  static ngAcceptInputType_showAvatar: BooleanInput;

  showAvatar: boolean = true;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  user: User;
  selectedFile: File | null = null;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    protected _userService: UserService,
  ) {}

  ngOnInit(): void {
    this._userService.user$.pipe(takeUntil(this._unsubscribeAll)).subscribe((user: User) => {
      this.user = user;
      this._changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  signOut(): void {
    this.updateUserStatus('offline');
    this._router.navigate(['sign-out']);
  }

  updateUserStatus(status: string): void {
    // Return if user is not available
    if (!this.user) {
      return;
    }
    let updatedUser = this.user;
    updatedUser.status = status;
    // Update the user
    this._userService.updateUser(updatedUser).subscribe((user) => (this.user = user));
  }

  navigateToProfile(): void {
    this._router.navigate(['/profile']);
  }
}
