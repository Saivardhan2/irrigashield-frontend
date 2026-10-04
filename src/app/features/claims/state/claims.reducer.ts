import { createReducer, on } from '@ngrx/store';
import { ClaimsActions } from './claims.actions';
import { ClaimResponse, IrrigationReadingResponse } from '../model/claim.models';

export interface ClaimsState {
  claims: ClaimResponse[];
  lastReading: IrrigationReadingResponse | null;
  alertClaim: ClaimResponse | null;
  loading: boolean;
  error: string | null;
}

export const initialClaimsState: ClaimsState = {
  claims: [],
  lastReading: null,
  alertClaim: null,
  loading: false,
  error: null
};

export const claimsReducer = createReducer(
  initialClaimsState,
  on(ClaimsActions.submitReading, state => ({ ...state, loading: true, error: null })),
  on(ClaimsActions.submitReadingSuccess, (state, { response }) => ({
    ...state,
    loading: false,
    lastReading: response
  })),
  on(ClaimsActions.submitReadingFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(ClaimsActions.loadMyClaims, state => ({ ...state, loading: true, error: null })),
  on(ClaimsActions.loadMyClaimsSuccess, (state, { claims }) => ({ ...state, loading: false, claims })),
  on(ClaimsActions.loadMyClaimsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(ClaimsActions.loadAllClaims, state => ({ ...state, loading: true, error: null })),
  on(ClaimsActions.loadAllClaimsSuccess, (state, { claims }) => ({ ...state, loading: false, claims })),
  on(ClaimsActions.loadAllClaimsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(ClaimsActions.settleClaimSuccess, (state, { claim }) => ({
    ...state,
    claims: state.claims.map(c => c.claimId === claim.claimId ? claim : c)
  })),

  on(ClaimsActions.setAlertClaim, (state, { claim }) => ({ ...state, alertClaim: claim })),
  on(ClaimsActions.clearClaimAlert, state => ({ ...state, alertClaim: null }))
);