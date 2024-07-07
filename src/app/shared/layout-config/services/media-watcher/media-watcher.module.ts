import { NgModule } from '@angular/core';
import { GedMediaWatcherService } from './media-watcher.service';

@NgModule({
  providers: [GedMediaWatcherService],
})
export class GedMediaWatcherModule {
  /**
   * Constructor
   */
  constructor(private _gedMediaWatcherService: GedMediaWatcherService) {}
}
