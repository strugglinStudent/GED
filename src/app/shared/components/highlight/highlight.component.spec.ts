import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GedHighlightComponent } from './highlight.component';

describe('GedHighlightComponent', () => {
  let component: GedHighlightComponent;
  let fixture: ComponentFixture<GedHighlightComponent>;

  beforeEach(async () => {
    await TestBed.overrideComponent(GedHighlightComponent, { set: { template: '' } });
    await TestBed.configureTestingModule({
      declarations: [GedHighlightComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GedHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
