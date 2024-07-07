import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
@Injectable()
export class SplashScreenService {
  constructor(
    @Inject(DOCUMENT) private _document: any,
    private _router: Router,
  ) {
    this.init();
  }

  init() {
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1),
      )
      .subscribe(() => {
        setTimeout(() => {
          this.hide();
        }, 1500);
      });
  }
  show(): void {
    this._document.body.classList.remove('app-splash-screen-hidden');
  }
  hide(): void {
    this._document.body.classList.add('app-splash-screen-hidden');
  }
}
