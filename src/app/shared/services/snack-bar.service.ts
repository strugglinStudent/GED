import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  public window: any = window;
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(
    message: string,
    type: 'error' | 'success' | 'warning' | 'info' = 'error',
    horizontalPosition: MatSnackBarHorizontalPosition = 'center',
    verticalPosition: MatSnackBarVerticalPosition = this.window.innerWidth >= 600
      ? 'top'
      : 'bottom',
    durationInSeconds: number = 5,
  ): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: { message, type },
      horizontalPosition,
      verticalPosition,
      duration: durationInSeconds * 1000,
    });
  }
}
