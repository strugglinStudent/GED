import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from 'app/shared/shared.module';
import { ApplicationLayoutComponent } from './application.component';
import { MatToolbar } from '@angular/material/toolbar';
import { UserSettingsComponent } from '../../common/user-settings/user-settings.component';
import { MatNavList } from '@angular/material/list';
import { SideNavComponent } from '../../common/side-nav/side-nav.component';
import { SearchComponent } from '../../common/search/search.component';

@NgModule({
  declarations: [ApplicationLayoutComponent],
  imports: [
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    SharedModule,
    MatToolbar,
    UserSettingsComponent,
    MatNavList,
    SideNavComponent,
    SearchComponent,
  ],
  exports: [ApplicationLayoutComponent],
})
export class ApplicationLayoutModule {}
