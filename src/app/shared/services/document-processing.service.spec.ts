import { TestBed } from '@angular/core/testing';

import { DocumentProcessingService } from './document-processing.service';

describe('DocumentProcessingService', () => {
  let service: DocumentProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
