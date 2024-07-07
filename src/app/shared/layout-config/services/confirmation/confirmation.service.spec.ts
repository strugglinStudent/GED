import { TestBed } from '@angular/core/testing';
import { GedConfirmationService } from './confirmation.service';
import { MatDialogModule } from '@angular/material/dialog';
import { GedConfirmationConfig } from './confirmation.types';

describe('GedConfirmationService', () => {
  let service: GedConfirmationService;
  let config: GedConfirmationConfig;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [GedConfirmationService],
      imports: [MatDialogModule],
    });
    service = TestBed.inject(GedConfirmationService);
    service.open(config);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
