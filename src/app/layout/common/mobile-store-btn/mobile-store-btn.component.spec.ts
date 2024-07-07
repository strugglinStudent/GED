import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileStoreStnComponent } from './mobile-store-btn.component';

describe('MobileStoreStnComponent', () => {
  let component: MobileStoreStnComponent;
  let fixture: ComponentFixture<MobileStoreStnComponent>;

  beforeEach(async () => {
    await TestBed.overrideComponent(MobileStoreStnComponent, { set: { template: '' } });
    await TestBed.configureTestingModule({
      declarations: [MobileStoreStnComponent],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileStoreStnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
