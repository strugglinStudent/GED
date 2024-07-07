import { TestBed } from '@angular/core/testing';

import { SnackBarService } from './snack-bar.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

describe('SnackBarService', () => {
  let service: SnackBarService;
  let matSnackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: MatSnackBar, useValue: { openFromComponent: () => Promise.resolve() } },
      ],
    });
    service = TestBed.inject(SnackBarService);
    matSnackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should open top', () => {
    service.window = { innerWidth: 1000 };
    let message: string = 'test';
    let type: 'error' | 'success' | 'warning' | 'info' = 'error';
    let horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    let verticalPosition: MatSnackBarVerticalPosition = 'top';
    const durationInSeconds = 3;
    const spyOpenFromComponent = spyOn(matSnackBar, 'openFromComponent');
    service.openSnackBar(message, type, horizontalPosition, verticalPosition, durationInSeconds);

    expect(spyOpenFromComponent).toHaveBeenCalledWith(SnackBarComponent, {
      data: { message, type },
      horizontalPosition,
      verticalPosition,
      duration: durationInSeconds * 1000,
      panelClass: ['mat-snack-bar-panel-custom', `mat-snack-bar-custom-alert-${type}`],
    });
  });
  it('should open bottom', () => {
    service.window = { innerWidth: 500 };
    let message: string = 'test';
    const spyOpenFromComponent = spyOn(matSnackBar, 'openFromComponent');
    service.openSnackBar(message);

    expect(spyOpenFromComponent).toHaveBeenCalledWith(SnackBarComponent, {
      data: { message, type: 'error' },
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 3000,
      panelClass: ['mat-snack-bar-panel-custom', `mat-snack-bar-custom-alert-error`],
    });
  });
  it('should open without params', () => {
    service.window = { innerWidth: 1000 };
    let message: string = 'test';
    const spyOpenFromComponent = spyOn(matSnackBar, 'openFromComponent');
    service.openSnackBar(message);

    expect(spyOpenFromComponent).toHaveBeenCalledWith(SnackBarComponent, {
      data: { message, type: 'error' },
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: ['mat-snack-bar-panel-custom', `mat-snack-bar-custom-alert-error`],
    });
  });
});
