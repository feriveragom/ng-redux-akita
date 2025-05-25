import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { UserStore } from './store/user/user.store';
import { UserQuery } from './store/user/user.query';
import { UserService } from './store/user/user.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(withFetch()),
    UserStore,
    UserQuery,
    UserService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ]
};
