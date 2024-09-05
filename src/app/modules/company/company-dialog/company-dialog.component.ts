import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyService } from '../../../shared/services/company.service';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { Company } from '../../../shared/models/company';

@Component({
  selector: 'app-company-dialog',
  templateUrl: './company-dialog.component.html',
  styleUrl: './company-dialog.component.scss',
})
export class CompanyDialogComponent implements OnInit {
  companyForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CompanyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: string; company: Company },
    private fb: FormBuilder,
    private companyService: CompanyService,
    private snackBar: SnackBarService,
  ) {}

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      name: [
        this.data.company?.name || '',
        [Validators.required, Validators.minLength(3), Validators.pattern('^\\S+$')],
      ],
      address: [this.data.company?.address || '', [Validators.required, Validators.minLength(3)]],
      email: [this.data.company?.email || '', [Validators.required, Validators.email]],
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.dialogRef.close(true);
  }

  saveCompany(): void {
    if (this.companyForm.invalid) {
      return;
    }

    const companyData = this.companyForm.value;
    if (this.data.type === 'edit') {
      this.companyService.updateCompany({ ...this.data.company, ...companyData }).subscribe(
        () => {
          this.snackBar.openSnackBar('Company updated successfully', 'success');
          this.dialogRef.close();
        },
        (error) => {
          const errorMessage = error?.error?.message || 'Update failed';
          this.snackBar.openSnackBar(errorMessage, 'error');
        },
      );
    } else {
      this.companyService.addCompany(companyData).subscribe(
        () => {
          this.snackBar.openSnackBar('Company added successfully', 'success');
          this.dialogRef.close();
        },
        (error) => {
          const errorMessage = error?.error?.message || 'Add failed';
          this.snackBar.openSnackBar(errorMessage, 'error');
        },
      );
    }
  }
}
