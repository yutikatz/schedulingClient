import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { SchedulingsReducer } from './store/scheduleing.reducer'
import { provideEffects } from '@ngrx/effects';
import * as SchedulingsEffects from './store/scheduling.effects';
import { SchedulingService } from './services/scheduling.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideStore({
      Schedulings: SchedulingsReducer,
    }),
    provideEffects([SchedulingsEffects]),
    provideHttpClient(withFetch()),
    {
      provide: APP_INITIALIZER,
      useFactory: init,
      deps: [SchedulingService],
      multi: true
    }
  ]
};
 



export function init(SchedulingService: SchedulingService) {
  const url ='config/ipConfig.json';
  return (() => SchedulingService.initIp(url));
}

