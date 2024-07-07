import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GedConfigService } from '../shared/layout-config/services/config';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GedMediaWatcherService } from '../shared/layout-config/services/media-watcher';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.overrideComponent(LayoutComponent, { set: { template: '' } });
    await TestBed.configureTestingModule({
      declarations: [LayoutComponent],
      imports: [HttpClientTestingModule],
      providers: [
        RouterTestingModule,
        {
          provide: GedMediaWatcherService,
          useValue: {
            onMediaQueryChange$: () => of({}),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {} },
          },
        },
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
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
