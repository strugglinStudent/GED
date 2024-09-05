import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDistributionComponent } from './document-distribution.component';

describe('DocumentDistributionComponent', () => {
  let component: DocumentDistributionComponent;
  let fixture: ComponentFixture<DocumentDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentDistributionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
