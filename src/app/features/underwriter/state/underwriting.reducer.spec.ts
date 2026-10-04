import { underwritingReducer, initialUnderwritingState } from './underwriting.reducer';
import { UnderwritingActions } from './underwriting.actions';
import { UnderwritingResponse } from '../model/underwriting.models';

describe('UnderwritingReducer', () => {
  const mockCase: UnderwritingResponse = {
    caseId: 1,
    applicationId: 1,
    farmerUserId: 4,
    farmerEmail: 'ramesh.kumar@example.com',
    farmId: 1,
    cropId: 1,
    planId: 1,
    planName: 'Sugarcane Drought Shield',
    requestedCoverage: 200000,
    proposedStartDate: '2026-10-01',
    proposedEndDate: '2027-03-25',
    applicationStatus: 'SUBMITTED'
  };

  it('should return initial state by default', () => {
    const action = { type: 'NOOP' } as any;
    const state = underwritingReducer(initialUnderwritingState, action);
    expect(state).toEqual(initialUnderwritingState);
  });

  it('should store pending queue on loadPendingQueueSuccess', () => {
    const action = UnderwritingActions.loadPendingQueueSuccess({ queue: [mockCase] });
    const state = underwritingReducer(initialUnderwritingState, action);

    expect(state.pendingQueue.length).toBe(1);
    expect(state.loading).toBe(false);
  });
});