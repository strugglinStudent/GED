import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRequiredComponent } from './auth-required.component';

describe('LocalisationComponent', () => {
  let component: AuthRequiredComponent;
  let fixture: ComponentFixture<AuthRequiredComponent>;

  beforeEach(async () => {
    await TestBed.overrideComponent(AuthRequiredComponent, { set: { template: '' } });
    await TestBed.configureTestingModule({
      declarations: [AuthRequiredComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
