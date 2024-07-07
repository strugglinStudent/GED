import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from 'app/shared/shared.module';
import { SignInLayoutComponent } from './sign-in.component';
import { MobileStoreStnComponent } from '../../common/mobile-store-btn/mobile-store-btn.component';
import { AuthRequiredComponent } from './components/auth-required/auth-required.component';

@NgModule({
  declarations: [SignInLayoutComponent, MobileStoreStnComponent, AuthRequiredComponent],
  imports: [
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    SharedModule,
  ],
  exports: [SignInLayoutComponent],
})
export class SignInLayoutModule {}
