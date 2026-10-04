import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from './admin.reducer';

export const selectAdminState = createFeatureSelector<AdminState>('admin');

export const selectAdminUsers = createSelector(selectAdminState, state => state?.users ?? []);
export const selectAdminPlans = createSelector(selectAdminState, state => state?.plans ?? []);
export const selectAdminRules = createSelector(selectAdminState, state => state?.rules ?? []);
export const selectAdminSlabs = createSelector(selectAdminState, state => state?.slabs ?? []);
export const selectAdminLoading = createSelector(selectAdminState, state => state?.loading ?? false);
export const selectAdminError = createSelector(selectAdminState, state => state?.error ?? null);