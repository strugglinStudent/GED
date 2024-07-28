import { Component, OnInit } from '@angular/core';
import { Company } from '../../../shared/models/company';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { CompanyService } from '../../../shared/services/company.service';
import { MatDialog } from '@angular/material/dialog';
import { CompanyDialogComponent } from '../company-dialog/company-dialog.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-company-dashboard',
  standalone: true,
  templateUrl: './company-dashboard.component.html',
  styleUrl: './company-dashboard.component.scss',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatMenuTrigger,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatButton,
  ],
})
export class CompanyDashboardComponent implements OnInit {
  companies: Company[] = [];
  public displayedColumns: string[] = ['name', 'address', 'email', 'actions'];

  constructor(
    private companyService: CompanyService,
    public dialog: MatDialog,
    private snackBar: SnackBarService,
  ) {}

  openDialog(type: string, company?: Company): void {
    this.dialog
      .open(CompanyDialogComponent, {
        width: type === 'delete' ? '600px' : '800px',
        data: { type: type, company: company },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === true) {
          this.companyService.deleteCompany(company._id).subscribe(
            () => {
              this.loadCompanies();
            },
            (error) => {
              this.snackBar.openSnackBar(error?.message || 'Delete failed', 'error');
            },
          );
        }
        if (type !== 'delete') {
          this.loadCompanies();
        }
      });
  }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe(
      (companies) => {
        this.companies = companies;
      },
      (error) => {
        const errorMessage = error?.error || 'Loading failed';
        this.snackBar.openSnackBar(errorMessage, 'error');
      },
    );
  }
}
