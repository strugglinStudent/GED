import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GedConfigService } from '../../../shared/layout-config/services/config';
import { AppConfig, Scheme } from '../../../shared/config/app.config';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: [
    `
      app-settings {
        position: static;
        display: block;
        flex: none;
        width: auto;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent implements OnInit, OnDestroy {
  config: AppConfig;
  scheme: Scheme;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _router: Router,
    private _gedConfigService: GedConfigService,
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to config changes
    this._gedConfigService.config$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config: AppConfig) => {
        // Store the config
        this.config = config;
        this.scheme = config.scheme;
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Set the scheme on the config
   *
   */
  setScheme(): void {
    this.scheme = this.scheme === 'light' ? 'dark' : 'light';
    this._gedConfigService.config = { scheme: this.scheme };
  }
}
