import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInLayoutComponent } from './sign-in.component';
import { ActivatedRoute, ChildrenOutletContexts } from '@angular/router';

describe('SignInLayoutComponent', () => {
  let component: SignInLayoutComponent;
  let fixture: ComponentFixture<SignInLayoutComponent>;

  beforeEach(async () => {
    await TestBed.overrideComponent(SignInLayoutComponent, { set: { template: '' } });
    await TestBed.configureTestingModule({
      declarations: [SignInLayoutComponent],
      providers: [
        {
          provide: ChildrenOutletContexts,
          useValue: {
            getContext: () => {
              return {
                route: { snapshot: { data: { animation: 'test' } } },
              };
            },
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              firstChild: {
                url: [{ path: 'sign-up' }],
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInLayoutComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should getRouteAnimationData isMobile false', () => {
    component.environment.isMobile = false;
    const result = component.getRouteAnimationData();
    expect(result).toEqual('' as any);
  });
  it('should getRouteAnimationData isMobile true', () => {
    component.environment.isMobile = true;
    const result = component.getRouteAnimationData();
    expect(result).toEqual('test' as any);
  });
  it('should call open feature', () => {
    //component.openFeature();
    expect(component.displayFeature).toBeTruthy();
  });
  afterEach(() => {
    fixture.destroy();
  });
});
