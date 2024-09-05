import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-component',
  templateUrl: 'snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<SnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
  ) {}
  dismiss(): void {
    this.snackBarRef.dismiss();
  }

  getSnackbarColor(): string {
    switch (this.data.type) {
      case 'info':
        return 'blue';
      case 'success':
        return 'green';
      case 'warning':
        return '#DF8C32FF';
      case 'error':
        return 'red';
      default:
        return 'gray';
    }
  }
}
