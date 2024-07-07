import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationLayoutComponent } from './application.component';

describe('ApplicationLayoutComponent', () => {
  let component: ApplicationLayoutComponent;
  let fixture: ComponentFixture<ApplicationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.overrideComponent(ApplicationLayoutComponent, { set: { template: '' } });
    await TestBed.configureTestingModule({
      declarations: [ApplicationLayoutComponent],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
