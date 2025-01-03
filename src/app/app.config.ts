import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { itemsReducer } from './store/items.reducer';
import { productsReducer } from './store/products.reducer';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideStore({
        items: itemsReducer,
        products: productsReducer,
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects()
],
};
