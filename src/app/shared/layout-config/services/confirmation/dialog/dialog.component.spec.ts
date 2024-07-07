import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GedConfirmationDialogComponent } from './dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('GedConfirmationDialogComponent', () => {
  let component: GedConfirmationDialogComponent;
  let fixture: ComponentFixture<GedConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.overrideComponent(GedConfirmationDialogComponent, { set: { template: '' } });
    await TestBed.configureTestingModule({
      declarations: [GedConfirmationDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GedConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
