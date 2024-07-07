import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { registerLocaleData } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { appConfig } from './shared/config/app.config';
import { GedConfigModule } from './shared/layout-config/services/config';
import { GedModule } from './shared/layout-config';
import { IconsModule } from './shared/icons.module';
import { TokenInterceptor } from './shared/interceptors/auth.interceptor';
import localeEn from '@angular/common/locales/en';
import { AuthService } from './shared/services/auth.service';
const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled',
};
registerLocaleData(localeEn, 'en-US');
// Interceptors Provide Array

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, routerConfig),

    GedModule,
    GedConfigModule.forRoot(appConfig),
    IconsModule,

    MatDialogModule,
    MatSelectModule,
    // Layout module of your application
    LayoutModule,
    SharedModule,
    HttpClientModule,
    MatMenuModule,
  ],
  providers: [
    AuthService,
    { provide: LOCALE_ID, useValue: 'en-US' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
