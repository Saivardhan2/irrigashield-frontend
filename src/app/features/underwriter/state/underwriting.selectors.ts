import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UnderwritingState } from './underwriting.reducer';

export const selectUnderwritingState = createFeatureSelector<UnderwritingState>('underwriting');

export const selectPendingQueue = createSelector(
  selectUnderwritingState,
  (state: UnderwritingState) => state?.pendingQueue ?? []
);

export const selectActiveCase = createSelector(
  selectUnderwritingState,
  (state: UnderwritingState) => state?.activeCase ?? null
);

export const selectMyCases = createSelector(
  selectUnderwritingState,
  (state: UnderwritingState) => state?.myCases ?? []
);

export const selectUnderwritingLoading = createSelector(
  selectUnderwritingState,
  (state: UnderwritingState) => state?.loading ?? false
);

export const selectPendingCount = createSelector(
  selectPendingQueue,
  (queue) => queue.length
);