import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { SessionStore } from './store/session/session.store';
import { SessionQuery } from './store/session/session.query';
import { SessionService } from './store/session/session.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(withFetch()),
    SessionStore,
    SessionQuery,
    SessionService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ]
};
