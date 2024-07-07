import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, ChildrenOutletContexts } from '@angular/router';
import { routerAnimation } from '../../common/annimation/annimations';
import { EventData } from './data';

@Component({
  selector: 'app-sign-in-layout',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [routerAnimation],
})
export class SignInLayoutComponent implements OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  environment: any = environment;
  displayMap: boolean;
  zoom = 5;
  sourceA = EventData as any;
  logos = {
    football: '../../../../../../../../../assets/images/background/event/football.png',
    basketball: '../../../../../../../../../assets/images/background/event/basketball.png',
    video: '../../../../../../../../../assets/images/background/event/video.png',
    game: '../../../../../../../../../assets/images/background/event/game.png',
    happy: '../../../../../../../../../assets/images/background/event/happy.png',
    music: '../../../../../../../../../assets/images/background/event/music.png',
    saxophone: '../../../../../../../../../assets/images/background/event/saxophone.png',
    micro: '../../../../../../../../../assets/images/background/event/micro.png',
  };
  displayFeature: boolean;

  /**
   * Constructor
   */
  constructor(
    private contexts: ChildrenOutletContexts,
    private activatedRoute: ActivatedRoute,
  ) {}

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  /**
   * Get route animation state
   */
  getRouteAnimationData() {
    if (this.environment.isMobile) {
      return this.contexts.getContext('primary')?.route?.snapshot?.data?.animation;
    }
    return '';
  }
}
