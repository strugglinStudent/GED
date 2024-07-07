import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { GedConfigService } from '../../../shared/layout-config/services/config';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.overrideComponent(SettingsComponent, { set: { template: '' } });
    await TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      providers: [
        RouterTestingModule,
        {
          provide: GedConfigService,
          useValue: {
            config$: of({ scheme: '' }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should setScheme', () => {
    component.scheme = 'dark';
    component.setScheme();

    expect(component.scheme).toEqual('light');

    component.scheme = 'light';
    component.setScheme();

    expect(component.scheme).toEqual('dark');
  });
});
