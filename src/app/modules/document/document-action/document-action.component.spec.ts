import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentActionComponent } from './document-action.component';

describe('DisplayComponent', () => {
  let component: DocumentActionComponent;
  let fixture: ComponentFixture<DocumentActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentActionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
