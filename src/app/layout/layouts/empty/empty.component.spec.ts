import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyLayoutComponent } from './empty.component';

describe('EmptyLayoutComponent', () => {
  let component: EmptyLayoutComponent;
  let fixture: ComponentFixture<EmptyLayoutComponent>;

  beforeEach(async () => {
    await TestBed.overrideComponent(EmptyLayoutComponent, { set: { template: '' } });
    await TestBed.configureTestingModule({
      declarations: [EmptyLayoutComponent],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
