import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentProgressComponent } from './document-progress.component';

describe('UploadProgressComponent', () => {
  let component: DocumentProgressComponent;
  let fixture: ComponentFixture<DocumentProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentProgressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
