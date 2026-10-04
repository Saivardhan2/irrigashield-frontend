import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { Role } from '../model/auth.models';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectCurrentUser = createSelector(
  selectAuthState,
  (state: AuthState) => state?.user ?? null
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state?.isAuthenticated ?? false
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state?.loading ?? false
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state?.error ?? null
);

export const selectUserRole = createSelector(
  selectCurrentUser,
  (user) => user?.role ?? null
);

export const selectUserName = createSelector(
  selectCurrentUser,
  (user) => user?.name ?? ''
);

