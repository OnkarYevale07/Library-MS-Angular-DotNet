import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideHttpClient(), provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(JwtModule.forRoot({
    config: {
      tokenGetter: ()=>{
        return localStorage.getItem('access_token');
      },
      allowedDomains: ['localhost:7111'],
    }
  }))]
};
