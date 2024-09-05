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
import { NotificationsComponent } from '../../common/notifications/notifications.component';
import { DocumentModule } from '../../../modules/document/document.module';
import { CompanyModule } from '../../../modules/company/company.module';
import { UsersModule } from '../../../modules/users/users.module';
import { UserGroupModule } from '../../../modules/user-group/user-group.module';
import { ExplorerModule } from '../../../modules/explorer/explorer.module';
import { WorkflowModule } from '../../../modules/workflow/workflow.module';

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
    NotificationsComponent,
    CompanyModule,
    UsersModule,
    DocumentModule,
    WorkflowModule,
    UserGroupModule,
    ExplorerModule,
  ],
  exports: [ApplicationLayoutComponent],
})
export class ApplicationLayoutModule {}
