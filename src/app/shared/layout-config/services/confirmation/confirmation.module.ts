import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { GedConfirmationService } from './confirmation.service';
import { GedConfirmationDialogComponent } from './dialog/dialog.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [GedConfirmationDialogComponent],
  imports: [MatButtonModule, MatDialogModule, MatIconModule, CommonModule],
  providers: [GedConfirmationService],
})
export class GedConfirmationModule {
  /**
   * Constructor
   */
  constructor(private _gedConfirmationService: GedConfirmationService) {}
}
