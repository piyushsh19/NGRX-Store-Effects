import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';

import { AppComponent } from './app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      // routes
    ]),
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore()
  ],
});