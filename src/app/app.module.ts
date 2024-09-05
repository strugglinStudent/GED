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
import { ImageCropperComponent } from 'ngx-image-cropper';
import { AuthModule } from './modules/auth/auth.module'; // Adjust path as necessary

import localeEn from '@angular/common/locales/en';
import { AuthService } from './shared/services/auth.service';
import { AiApiInterceptor } from './shared/interceptors/ai-api.interceptor';
import { OcrApiInterceptor } from './shared/interceptors/ocr-api.interceptor';
import { ApiErrorsInterceptor } from './shared/interceptors/api-errors.interceptor';
import { ApplicationLayoutModule } from './layout/layouts/application/application.module';
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
    ImageCropperComponent,
    MatDialogModule,
    MatSelectModule,
    // Layout module of your application
    LayoutModule,
    ApplicationLayoutModule,
    SharedModule,
    HttpClientModule,
    MatMenuModule,
    AuthModule,
  ],
  providers: [
    AuthService,
    { provide: LOCALE_ID, useValue: 'en-US' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiErrorsInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AiApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: OcrApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
