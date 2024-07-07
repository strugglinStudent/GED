import { TestBed } from '@angular/core/testing';
import { GedMediaWatcherService } from './media-watcher.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { GedConfigService } from '../config';
import { of } from 'rxjs';

describe('GedMediaWatcherService', () => {
  let service: GedMediaWatcherService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        GedMediaWatcherService,
        BreakpointObserver,
        {
          provide: GedConfigService,
          useValue: {
            config$: of({
              screens: {
                sm: '600px',
                md: '960px',
                lg: '1280px',
                xl: '1440px',
              },
            }),
          },
        },
      ],
    });
    service = TestBed.inject(GedMediaWatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return an observable of media change events', () => {
    const testMediaChange = { matchingAliases: ['test-alias'], matchingQueries: {} };
    service['_onMediaChange'].next(testMediaChange);
    service.onMediaChange$.subscribe((mediaChange) => {
      expect(mediaChange).toEqual(testMediaChange);
    });
  });
  it('should observe breakpoint changes', () => {
    const query = '(max-width: 600px)';
    const expectedState = { matches: false, breakpoints: { [query]: false } };
    service.onMediaQueryChange$(query).subscribe((state) => {
      expect(state).toEqual(expectedState);
    });
  });
});
