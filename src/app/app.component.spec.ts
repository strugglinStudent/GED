import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
describe('AppComponent', () => {
  let component: AppComponent;
  const matDialogMock = {
    open: jasmine.createSpy('open'),
  };
  beforeEach(async () => {
    await TestBed.overrideComponent(AppComponent, { set: { template: '' } });
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: MatDialog, useValue: matDialogMock },
        {
          provide: DateAdapter,
          useValue: {
            setLocale: () => {},
          },
        },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
  /*
  it('should init AppComponent', async () => {
    const dateAdapter = TestBed.inject(DateAdapter);
    const setLocaleSpy = spyOn(dateAdapter, 'setLocale');
      await component.ngOnInit();
    expect(setLocaleSpy).toHaveBeenCalledWith('en');
    expect(setLocaleSpy).toHaveBeenCalledTimes(1);
  });

  it('should init AppComponent with Capacitor.isNativePlatform true', async () => {
    spyOn(Capacitor, 'isNativePlatform').and.returnValue(true);
    const appUpdateService = TestBed.inject(AppUpdateService);
    const updateAppSpy = spyOn(appUpdateService, 'updateApp');
    environment.version = '1.0.0';
    await component.ngOnInit();
    expect(updateAppSpy).toHaveBeenCalledTimes(1);
  });

  it('should init AdMob', async () => {
    const dataCenterService = TestBed.inject(DataCenterService);
    const adMobService = TestBed.inject(AdMobService);
    spyOn(adMobService, 'initAdMob');
    dataCenterService.isSplashScreenSubject.next(false);

    await component.ngOnInit();

    expect(adMobService.initAdMob).toHaveBeenCalledTimes(1);
  });

  it('should call install app if web android', async () => {
    const capacitorService = TestBed.inject(CapacitorService);
    spyOn(capacitorService, 'isNativePlatform').and.returnValue(false);
    localStorage.removeItem('askToInstall');
    const mockDialogRef = {
      afterClosed: () => of('confirm'), // Simule la confirmation de l'utilisateur
    };
    matDialogMock.open.and.returnValue(mockDialogRef);
    component.platform.ANDROID = true;
    component.platform.IOS = false;

    spyOn(window, 'open');
    await component.ngOnInit();
    expect(window.open).toHaveBeenCalledWith(environment.links.androidAppLink);
  });
  it('should call install app if web android', async () => {
    const capacitorService = TestBed.inject(CapacitorService);
    spyOn(capacitorService, 'isNativePlatform').and.returnValue(false);
    localStorage.removeItem('askToInstall');
    const mockDialogRef = {
      afterClosed: () => of('confirm'), // Simule la confirmation de l'utilisateur
    };
    matDialogMock.open.and.returnValue(mockDialogRef);
    component.platform.ANDROID = false;
    component.platform.IOS = true;
    spyOn(window, 'open');
    await component.ngOnInit();
    expect(window.open).toHaveBeenCalledWith(environment.links.iosAppLink);
  });
  it('should call install app if web android and decline call', async () => {
    const capacitorService = TestBed.inject(CapacitorService);
    spyOn(capacitorService, 'isNativePlatform').and.returnValue(false);
    localStorage.removeItem('askToInstall');

    const mockDialogRef = {
      afterClosed: () => of('decline'),
    };
    component.platform.ANDROID = true;
    component.platform.IOS = false;
    matDialogMock.open.and.returnValue(mockDialogRef);
    await component.ngOnInit();
    expect(localStorage.getItem('askToInstall')).toBe('false');
  });*/
});
