import { claimsReducer, initialClaimsState } from './claims.reducer';
import { ClaimsActions } from './claims.actions';
import { ClaimResponse } from '../model/claim.models';
import { describe, it, expect } from 'vitest';

describe('ClaimsReducer', () => {
  it('should return initial state on unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const state = claimsReducer(initialClaimsState, action as any);
    expect(state).toEqual(initialClaimsState);
  });

  it('should set claims on loadMyClaimsSuccess', () => {
    const mockClaims: ClaimResponse[] = [
      {
        claimId: 1,
        policyId: 1,
        triggerEvent: 'WATER_DEFICIT_VEGETATIVE',
        payoutPercentage: 25,
        payoutAmount: 37500,
        status: 'APPROVED'
      }
    ];
    const state = claimsReducer(initialClaimsState, ClaimsActions.loadMyClaimsSuccess({ claims: mockClaims }));
    expect(state.claims.length).toBe(1);
    expect(state.loading).toBe(false);
  });
});