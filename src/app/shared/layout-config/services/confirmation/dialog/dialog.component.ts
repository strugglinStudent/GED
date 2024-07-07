import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GedConfirmationConfig } from '../confirmation.types';

@Component({
  selector: 'app-ged-confirmation-dialog',
  templateUrl: './dialog.component.html',
  styles: [
    /* language=SCSS */
    `
      .ged-confirmation-dialog-panel {
        @screen md {
          @apply w-96;
        }

        .mat-dialog-container {
          padding: 0 !important;
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class GedConfirmationDialogComponent {
  /**
   * Constructor
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: GedConfirmationConfig,
    public matDialogRef: MatDialogRef<GedConfirmationDialogComponent>,
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
}
