import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClaimsState } from './claims.reducer';

export const selectClaimsState = createFeatureSelector<ClaimsState>('claims');

export const selectAllClaims = createSelector(selectClaimsState, state => state?.claims ?? []);
export const selectLastReading = createSelector(selectClaimsState, state => state?.lastReading ?? null);
export const selectAlertClaim = createSelector(selectClaimsState, state => state?.alertClaim ?? null);
export const selectClaimsLoading = createSelector(selectClaimsState, state => state?.loading ?? false);
export const selectClaimsError = createSelector(selectClaimsState, state => state?.error ?? null);