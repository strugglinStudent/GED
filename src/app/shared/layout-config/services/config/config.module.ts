import { ModuleWithProviders, NgModule } from '@angular/core';
import { GedConfigService } from './config.service';
import { GED_APP_CONFIG } from './config.constants';

@NgModule()
export class GedConfigModule {
  /**
   * Constructor
   */
  constructor(private _gedConfigService: GedConfigService) {}

  /**
   * forRoot method for setting user configuration
   *
   * @param config
   */
  static forRoot(config: any): ModuleWithProviders<GedConfigModule> {
    return {
      ngModule: GedConfigModule,
      providers: [
        {
          provide: GED_APP_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
