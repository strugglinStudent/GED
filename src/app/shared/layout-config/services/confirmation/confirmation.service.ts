import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import merge from 'lodash-es/merge';
import { GedConfirmationDialogComponent } from './dialog/dialog.component';
import { GedConfirmationConfig } from './confirmation.types';

@Injectable()
export class GedConfirmationService {
  private _defaultConfig: GedConfirmationConfig = {
    title: 'Confirm action',
    message: 'Are you sure you want to confirm this action?',
    icon: {
      show: true,
      name: 'heroicons_outline:exclamation',
      color: 'warn',
    },
    actions: {
      confirm: {
        show: true,
        label: 'Yes',
        color: 'warn',
      },
      cancel: {
        show: true,
        label: 'No',
      },
    },
    dismissible: false,
  };

  /**
   * Constructor
   */
  constructor(private _matDialog: MatDialog) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  open(config: GedConfirmationConfig = {}): MatDialogRef<GedConfirmationDialogComponent> {
    // Merge the user config with the default config
    const userConfig = merge({}, this._defaultConfig, config);

    // Open the dialog
    return this._matDialog.open(GedConfirmationDialogComponent, {
      autoFocus: false,
      disableClose: !userConfig.dismissible,
      data: userConfig,
      panelClass: 'ged-confirmation-dialog-panel',
    });
  }
}
