import { NgModule } from '@angular/core';
import { GedUtilsService } from '../utils/utils.service';

@NgModule({
  providers: [GedUtilsService],
})
export class GedUtilsModule {
  /**
   * Constructor
   */
  constructor(private _gedUtilsService: GedUtilsService) {}
}
