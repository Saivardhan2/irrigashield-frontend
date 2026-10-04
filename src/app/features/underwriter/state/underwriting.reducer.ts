import { createReducer, on } from '@ngrx/store';
import { UnderwritingActions } from './underwriting.actions';
import { UnderwritingResponse } from '../model/underwriting.models';

export interface UnderwritingState {
  pendingQueue: UnderwritingResponse[];
  activeCase: UnderwritingResponse | null;
  myCases: UnderwritingResponse[];
  loading: boolean;
  error: string | null;
}

export const initialUnderwritingState: UnderwritingState = {
  pendingQueue: [],
  activeCase: null,
  myCases: [],
  loading: false,
  error: null
};

export const underwritingReducer = createReducer(
  initialUnderwritingState,
  on(
    UnderwritingActions.loadPendingQueue,
    UnderwritingActions.loadMyCases,
    UnderwritingActions.startReview,
    UnderwritingActions.assessRisk,
    UnderwritingActions.approveApplication,
    UnderwritingActions.rejectApplication,
    (state) => ({ ...state, loading: true, error: null })
  ),
  on(UnderwritingActions.loadPendingQueueSuccess, (state, { queue }) => ({
    ...state,
    pendingQueue: queue,
    loading: false,
    error: null
  })),
  on(UnderwritingActions.loadMyCasesSuccess, (state, { cases }) => ({
    ...state,
    myCases: cases,
    loading: false,
    error: null
  })),
  on(
    UnderwritingActions.startReviewSuccess,
    UnderwritingActions.assessRiskSuccess,
    (state, { underCase }) => ({
      ...state,
      activeCase: underCase,
      pendingQueue: state.pendingQueue.map(c => c.applicationId === underCase.applicationId ? underCase : c),
      loading: false,
      error: null
    })
  ),
  on(
    UnderwritingActions.approveApplicationSuccess,
    UnderwritingActions.rejectApplicationSuccess,
    (state, { underCase }) => ({
      ...state,
      activeCase: underCase,
      pendingQueue: state.pendingQueue.filter(c => c.applicationId !== underCase.applicationId),
      myCases: [underCase, ...state.myCases.filter(c => c.applicationId !== underCase.applicationId)],
      loading: false,
      error: null
    })
  ),
  on(UnderwritingActions.selectActiveCase, (state, { underCase }) => ({
    ...state,
    activeCase: underCase
  })),
  on(
    UnderwritingActions.loadPendingQueueFailure,
    UnderwritingActions.loadMyCasesFailure,
    UnderwritingActions.startReviewFailure,
    UnderwritingActions.assessRiskFailure,
    UnderwritingActions.approveApplicationFailure,
    UnderwritingActions.rejectApplicationFailure,
    (state, { error }) => ({ ...state, loading: false, error })
  )
);