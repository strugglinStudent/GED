import { TestBed } from '@angular/core/testing';
import { GedConfigService } from './config.service';
import { GED_APP_CONFIG } from './config.constants';
import { InjectionToken } from '@angular/core';

describe('GedConfigService', () => {
  let service: GedConfigService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        GedConfigService,
        { provide: GED_APP_CONFIG, useValue: new InjectionToken<any>('GED_APP_CONFIG') },
      ],
    });
    service = TestBed.inject(GedConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should update config property and reset', () => {
    const originalConfig = service.config$;
    const newConfig = new InjectionToken<any>('GED_APP_CONFIG');
    service.config = newConfig;
    expect(service.config$).not.toBe(originalConfig);
    service.reset();
    expect(service.config$).toEqual(originalConfig);
  });
});
