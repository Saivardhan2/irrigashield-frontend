import { createReducer, on } from '@ngrx/store';
import { FarmerActions } from './farmer.actions';
import { FarmerProfileResponse } from '../model/farmer.models';
import { FarmResponse } from '../model/farm.models';
import { CropResponse } from '../model/crop.models';
import { IrrigationProfileResponse } from '../model/irrigation.models';
import { 
  InsurancePlanResponse, 
  PolicyApplicationResponse, 
  PolicyResponse 
} from '../model/application.models';

export interface FarmerState {
  profile: FarmerProfileResponse | null;
  farms: FarmResponse[];
  selectedFarmId: number | null;
  cropsByFarmId: Record<number, CropResponse[]>;
  irrigationByFarmId: Record<number, IrrigationProfileResponse | null>;
  activePlans: InsurancePlanResponse[];
  myApplications: PolicyApplicationResponse[];
  approvedQuote: PolicyResponse | null;
  myPolicies: PolicyResponse[];
  loading: boolean;
  error: string | null;
}

export const initialFarmerState: FarmerState = {
  profile: null,
  farms: [],
  selectedFarmId: null,
  cropsByFarmId: {},
  irrigationByFarmId: {},
  activePlans: [],
  myApplications: [],
  approvedQuote: null,
  myPolicies: [],
  loading: false,
  error: null
};

export const farmerReducer = createReducer(
  initialFarmerState,
  on(
    FarmerActions.loadProfile,
    FarmerActions.saveProfile,
    FarmerActions.loadFarms,
    FarmerActions.createFarm,
    FarmerActions.loadCrops,
    FarmerActions.addCrop,
    FarmerActions.loadIrrigation,
    FarmerActions.saveIrrigation,
    FarmerActions.loadActivePlans,
    FarmerActions.loadApplications,
    FarmerActions.createApplication,
    FarmerActions.submitApplication,
    FarmerActions.loadApprovedQuote,
    FarmerActions.acceptQuote,
    FarmerActions.loadMyPolicies,
    (state) => ({ ...state, loading: true, error: null })
  ),
  on(FarmerActions.loadProfileSuccess, FarmerActions.saveProfileSuccess, (state, { profile }) => ({
    ...state,
    profile,
    loading: false,
    error: null
  })),
  on(FarmerActions.loadFarmsSuccess, (state, { farms }) => ({
    ...state,
    farms,
    selectedFarmId: state.selectedFarmId ?? (farms.length > 0 ? farms[0].farmId : null),
    loading: false,
    error: null
  })),
  on(FarmerActions.createFarmSuccess, (state, { farm }) => ({
    ...state,
    farms: [...state.farms, farm],
    selectedFarmId: farm.farmId,
    loading: false,
    error: null
  })),
  on(FarmerActions.selectFarm, (state, { farmId }) => ({
    ...state,
    selectedFarmId: farmId
  })),
  on(FarmerActions.loadCropsSuccess, (state, { farmId, crops }) => ({
    ...state,
    cropsByFarmId: { ...state.cropsByFarmId, [farmId]: crops },
    loading: false,
    error: null
  })),
  on(FarmerActions.addCropSuccess, (state, { crop }) => {
    const existing = state.cropsByFarmId[crop.farmId] || [];
    return {
      ...state,
      cropsByFarmId: { ...state.cropsByFarmId, [crop.farmId]: [...existing, crop] },
      loading: false,
      error: null
    };
  }),
  on(FarmerActions.loadIrrigationSuccess, (state, { farmId, irrigation }) => ({
    ...state,
    irrigationByFarmId: { ...state.irrigationByFarmId, [farmId]: irrigation },
    loading: false,
    error: null
  })),
  on(FarmerActions.saveIrrigationSuccess, (state, { irrigation }) => ({
    ...state,
    irrigationByFarmId: { ...state.irrigationByFarmId, [irrigation.farmId]: irrigation },
    loading: false,
    error: null
  })),
  on(FarmerActions.loadActivePlansSuccess, (state, { plans }) => ({
    ...state,
    activePlans: plans,
    loading: false,
    error: null
  })),
  on(FarmerActions.loadApplicationsSuccess, (state, { applications }) => ({
    ...state,
    myApplications: applications,
    loading: false,
    error: null
  })),
  on(FarmerActions.createApplicationSuccess, (state, { application }) => ({
    ...state,
    myApplications: [...state.myApplications, application],
    loading: false,
    error: null
  })),
  on(FarmerActions.submitApplicationSuccess, (state, { application }) => ({
    ...state,
    myApplications: state.myApplications.map(a => a.applicationId === application.applicationId ? application : a),
    loading: false,
    error: null
  })),
  on(FarmerActions.loadApprovedQuoteSuccess, (state, { quote }) => ({
    ...state,
    approvedQuote: quote,
    loading: false,
    error: null
  })),
  on(FarmerActions.acceptQuoteSuccess, (state, { policy }) => ({
    ...state,
    myPolicies: [...state.myPolicies, policy],
    approvedQuote: null,
    loading: false,
    error: null
  })),
  on(FarmerActions.loadMyPoliciesSuccess, (state, { policies }) => ({
    ...state,
    myPolicies: policies,
    loading: false,
    error: null
  })),
  on(
    FarmerActions.loadProfileFailure,
    FarmerActions.saveProfileFailure,
    FarmerActions.loadFarmsFailure,
    FarmerActions.createFarmFailure,
    FarmerActions.loadCropsFailure,
    FarmerActions.addCropFailure,
    FarmerActions.loadIrrigationFailure,
    FarmerActions.saveIrrigationFailure,
    FarmerActions.loadActivePlansFailure,
    FarmerActions.loadApplicationsFailure,
    FarmerActions.createApplicationFailure,
    FarmerActions.submitApplicationFailure,
    FarmerActions.loadApprovedQuoteFailure,
    FarmerActions.acceptQuoteFailure,
    FarmerActions.loadMyPoliciesFailure,
    (state, { error }) => ({ ...state, loading: false, error })
  )
);