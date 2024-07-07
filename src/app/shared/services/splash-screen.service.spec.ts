import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SplashScreenService } from './splash-screen.service';
import { NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';

describe('SplashScreenService', () => {
  let service: SplashScreenService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        SplashScreenService,
        { provide: Router, useValue: { events: of(new NavigationEnd(1, 'test', 'test')) } },
      ],
    });
    service = TestBed.inject(SplashScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should hide splash screen when init service', fakeAsync(() => {
    service = TestBed.inject(SplashScreenService);
    const spy = spyOn(service, 'hide');
    service.init();
    tick(1501);
    expect(spy).toHaveBeenCalledTimes(1);
  }));
  it('should hide splash screen', () => {
    const spy = spyOn(document.body.classList, 'add');
    service.hide();
    expect(spy).toHaveBeenCalledWith('app-splash-screen-hidden');
  });
  it('should show splash screen', () => {
    const spy = spyOn(document.body.classList, 'remove');
    service.show();
    expect(spy).toHaveBeenCalledWith('app-splash-screen-hidden');
  });
});
