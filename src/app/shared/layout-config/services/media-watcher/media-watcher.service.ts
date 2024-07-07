import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable, ReplaySubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GedConfigService } from '../config';
import fromPairs from 'lodash-es/fromPairs';

@Injectable()
export class GedMediaWatcherService {
  private _onMediaChange: ReplaySubject<{ matchingAliases: string[]; matchingQueries: any }> =
    new ReplaySubject<{ matchingAliases: string[]; matchingQueries: any }>(1);

  /**
   * Constructor
   */
  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _gedConfigService: GedConfigService,
  ) {
    this._gedConfigService.config$
      .pipe(
        map((config) =>
          fromPairs(
            Object.entries(config.screens).map(([alias, screen]) => [
              alias,
              `(min-width: ${screen})`,
            ]),
          ),
        ),
        switchMap((screens) =>
          this._breakpointObserver.observe(Object.values(screens)).pipe(
            map((state) => {
              // Prepare the observable values and set their defaults
              const matchingAliases: string[] = [];
              const matchingQueries: any = {};

              // Get the matching breakpoints and use them to fill the subject
              /* istanbul ignore next */
              const matchingBreakpoints =
                Object.entries(state.breakpoints).filter(([, matches]) => matches) ?? [];
              for (const [query] of matchingBreakpoints) {
                // Find the alias of the matching query
                const matchingAlias = Object.entries(screens).find(([, q]) => q === query)[0];

                // Add the matching query to the observable values
                if (matchingAlias) {
                  matchingAliases.push(matchingAlias);
                  matchingQueries[matchingAlias] = query;
                }
              }

              // Execute the observable
              this._onMediaChange.next({
                matchingAliases,
                matchingQueries,
              });
            }),
          ),
        ),
      )
      .subscribe();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for _onMediaChange
   */
  get onMediaChange$(): Observable<{ matchingAliases: string[]; matchingQueries: any }> {
    return this._onMediaChange.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * On media query change
   *
   * @param query
   */
  onMediaQueryChange$(query: string | string[]): Observable<BreakpointState> {
    return this._breakpointObserver.observe(query);
  }
}
