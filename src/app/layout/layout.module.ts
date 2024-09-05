import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LayoutComponent } from 'app/layout/layout.component';
import { SignInLayoutModule } from './layouts/sign-in/sign-in.module';
import { ApplicationLayoutModule } from './layouts/application/application.module';
import { SharedModule } from 'app/shared/shared.module';
import { EmptyLayoutModule } from './layouts/empty/empty.module';

const layoutModules = [SignInLayoutModule, ApplicationLayoutModule];

@NgModule({
  declarations: [LayoutComponent],
  imports: [MatIconModule, MatTooltipModule, SharedModule, ...layoutModules, EmptyLayoutModule],
  exports: [LayoutComponent, ...layoutModules],
})
export class LayoutModule {}
