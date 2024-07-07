import { TestBed } from '@angular/core/testing';
import { GedMediaWatcherService } from './media-watcher.service';

import { GedMediaWatcherModule } from './media-watcher.module';
import { GedConfigService } from '../config';
import { of } from 'rxjs';

describe('GedMediaWatcherModule', () => {
  let module: GedMediaWatcherModule;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        GedMediaWatcherModule,
        GedMediaWatcherService,
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
    module = TestBed.inject(GedMediaWatcherModule);
  });

  it('should be created', () => {
    expect(module).toBeTruthy();
  });
});
