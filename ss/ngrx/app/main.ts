import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideEntityData, withEffects } from '@ngrx/data';

import { AppComponent } from './app.component';
import { entityConfig } from './entity-metadata';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideStore(),
    provideEffects(),
    provideEntityData(entityConfig, withEffects())
  ],
});