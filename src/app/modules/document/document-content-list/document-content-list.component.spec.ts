import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentContentListComponent } from './document-content-list.component';

describe('DocumentContentListComponent', () => {
  let component: DocumentContentListComponent;
  let fixture: ComponentFixture<DocumentContentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentContentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentContentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
