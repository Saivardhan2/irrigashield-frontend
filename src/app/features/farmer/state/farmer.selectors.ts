import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FarmerState } from './farmer.reducer';

export const selectFarmerState = createFeatureSelector<FarmerState>('farmer');

export const selectFarmerProfile = createSelector(
  selectFarmerState,
  (state: FarmerState) => state?.profile ?? null
);

export const selectFarms = createSelector(
  selectFarmerState,
  (state: FarmerState) => state?.farms ?? []
);

export const selectSelectedFarmId = createSelector(
  selectFarmerState,
  (state: FarmerState) => state?.selectedFarmId ?? null
);

export const selectSelectedFarm = createSelector(
  selectFarms,
  selectSelectedFarmId,
  (farms, selectedId) => farms.find(f => f.farmId === selectedId) ?? (farms.length > 0 ? farms[0] : null)
);

export const selectCropsByFarmId = createSelector(
  selectFarmerState,
  (state: FarmerState) => state?.cropsByFarmId ?? {}
);

export const selectSelectedFarmCrops = createSelector(
  selectCropsByFarmId,
  selectSelectedFarmId,
  (cropsMap, selectedId) => (selectedId ? cropsMap[selectedId] || [] : [])
);

export const selectIrrigationByFarmId = createSelector(
  selectFarmerState,
  (state: FarmerState) => state?.irrigationByFarmId ?? {}
);

export const selectSelectedFarmIrrigation = createSelector(
  selectIrrigationByFarmId,
  selectSelectedFarmId,
  (irrigationMap, selectedId) => (selectedId ? irrigationMap[selectedId] || null : null)
);

export const selectActivePlans = createSelector(
  selectFarmerState,
  (state: FarmerState) => state?.activePlans ?? []
);

export const selectMyApplications = createSelector(
  selectFarmerState,
  (state: FarmerState) => state?.myApplications ?? []
);

export const selectApprovedQuote = createSelector(
  selectFarmerState,
  (state: FarmerState) => state?.approvedQuote ?? null
);

export const selectMyPolicies = createSelector(
  selectFarmerState,
  (state: FarmerState) => state?.myPolicies ?? []
);

export const selectFarmerLoading = createSelector(
  selectFarmerState,
  (state: FarmerState) => state?.loading ?? false
);

export const selectFarmerError = createSelector(
  selectFarmerState,
  (state: FarmerState) => state?.error ?? null
);