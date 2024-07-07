import { TestBed } from '@angular/core/testing';

import { GedConfigModule, GedConfigService } from '../config';
import { GED_APP_CONFIG } from './config.constants';
import { InjectionToken } from '@angular/core';

describe('GedConfigModule', () => {
  let module: GedConfigModule;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        GedConfigModule,
        GedConfigService,
        {
          provide: GED_APP_CONFIG,
          useValue: new InjectionToken<any>('GED_APP_CONFIG'),
        },
      ],
    });
    module = TestBed.inject(GedConfigModule);
  });

  it('should be created', () => {
    expect(module).toBeTruthy();
  });

  it('should return a module with providers', () => {
    const config = new InjectionToken<any>('GED_APP_CONFIG');
    const result = GedConfigModule.forRoot(config);
    expect(result).toEqual({
      ngModule: GedConfigModule,
      providers: [
        {
          provide: GED_APP_CONFIG,
          useValue: config,
        },
      ],
    });
  });
});
