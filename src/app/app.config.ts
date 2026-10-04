import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { credentialsInterceptor } from './features/auth/interceptors/credentials.interceptor';
import { errorInterceptor } from './features/auth/interceptors/error.interceptor';
import { authReducer } from './features/auth/state/auth.reducer';
import { AuthEffects } from './features/auth/state/auth.effects';
import { farmerReducer } from './features/farmer/state/farmer.reducer';
import { FarmerEffects } from './features/farmer/state/farmer.effects';
import { underwritingReducer } from './features/underwriter/state/underwriting.reducer';
import { UnderwritingEffects } from './features/underwriter/state/underwriting.effects';
import { claimsReducer } from './features/claims/state/claims.reducer';
import { ClaimsEffects } from './features/claims/state/claims.effects';
import { adminReducer } from './features/admin/state/admin.reducer';
import { AdminEffects } from './features/admin/state/admin.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([credentialsInterceptor, errorInterceptor])
    ),
    provideStore({
      auth: authReducer,
      farmer: farmerReducer,
      underwriting: underwritingReducer,
      claims: claimsReducer,
      admin: adminReducer
    }),
    provideEffects([
      AuthEffects,
      FarmerEffects,
      UnderwritingEffects,
      ClaimsEffects,
      AdminEffects
    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: false })
  ]
};

