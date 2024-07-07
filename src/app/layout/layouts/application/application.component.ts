import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from 'app/shared/models/user';
import { Subject } from 'rxjs';
import { UserService } from 'app/shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GedMediaWatcherService } from '../../../shared/layout-config/services/media-watcher';
@Component({
  selector: 'app-application-layout',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ApplicationLayoutComponent implements OnInit, OnDestroy {
  user: User;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private _GedMediaWatcherService: GedMediaWatcherService;
  // private _navigationService: navigationService;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
  ) {}
  ngOnInit(): void {
    // Subscribe to navigation data
    /*    this._navigationService.navigation$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((navigation: Navigation) =>
      {
        this.navigation = navigation;
      });
*/
    // Subscribe to the user service
    this._userService.user$.subscribe((user) => {
      this.user = user;
    });
    this._userService.get().subscribe();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
