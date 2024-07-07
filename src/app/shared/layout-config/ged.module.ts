import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { GedConfirmationModule } from './services/confirmation';
import { GedMediaWatcherModule } from './services/media-watcher';
import { GedUtilsModule } from './services/utils';

@NgModule({
  imports: [GedConfirmationModule, GedMediaWatcherModule, GedUtilsModule],
  providers: [
    {
      // Disable 'theme' sanity check
      provide: MATERIAL_SANITY_CHECKS,
      useValue: {
        doctype: true,
        theme: false,
        version: true,
      },
    },
    {
      // Use the 'fill' appearance on Angular Material form fields by default
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill',
      },
    },
  ],
})
export class GedModule {
  /**
   * Constructor
   */
  constructor(@Optional() @SkipSelf() parentModule?: GedModule) {
    if (parentModule) {
      throw new Error(
        'GedModule has already been loaded. Import this module in the AppModule only!',
      );
    }
  }
}
