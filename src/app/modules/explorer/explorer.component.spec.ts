import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerComponent } from './explorer.component';
import { of } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { AdMobService } from '../../shared/services/ad-mob.service';

describe('ExplorerComponent', () => {
  let component: ExplorerComponent;
  let fixture: ComponentFixture<ExplorerComponent>;
  // let authService: AuthService;

  beforeEach(async () => {
    await TestBed.overrideComponent(ExplorerComponent, { set: { template: '' } });
    await TestBed.configureTestingModule({
      declarations: [ExplorerComponent],
      providers: [
        {
          provide: AuthService,
          useValue: {
            getCurrentUser: () =>
              of({
                id: 'u#0000',
              }),
            sendPreferences: ([]) => of(null),
          },
        },
        {
          provide: AdMobService,
          useValue: {
            showBanner: () => Promise.resolve(),
            hideBanner: () => Promise.resolve(),
          },
        },
        MatSnackBar,
        SnackBarService,
      ],
    }).compileComponents();
    //authService = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(ExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('should call onInit method and send preferences', async () => {
    const preferences = [
      'p#sports#soccer#fr#ligue-1#lille',
      'p#sports#soccer#fr#ligue-1#brest',
      'p#sports#soccer#fr#ligue-1#monaco',
    ];
    localStorage.setItem('preferences', JSON.stringify(preferences));
    localStorage.removeItem('sendPreferences');
    localStorage.removeItem('geolocation');
    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((successCallback) => {
      return successCallback({
        coords: undefined,
        timestamp: 0,
      });
    });
    const user = {
      id: 'u#0000',
    };
    spyOn(authService, 'getCurrentUser').and.returnValue(of(user));

    spyOn(authService, 'sendPreferences').and.returnValue(of({} as null));
    const dataCenterService = TestBed.inject(DataCenterService);
    dataCenterService.appMarginPubSubject.next(25);

    await component.ngOnInit();

    expect(authService.getCurrentUser).toHaveBeenCalled();
    expect(authService.sendPreferences).toHaveBeenCalled();
  });*/
});
