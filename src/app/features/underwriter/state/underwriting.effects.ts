import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UnderwritingActions } from './underwriting.actions';
import { UnderwritingApiService } from '../services/underwriting-api.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class UnderwritingEffects {
  private actions$ = inject(Actions);
  private underwritingApi = inject(UnderwritingApiService);
  private notificationService = inject(NotificationService);

  loadPendingQueue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UnderwritingActions.loadPendingQueue),
      switchMap(() =>
        this.underwritingApi.getPendingApplications().pipe(
          map(queue => UnderwritingActions.loadPendingQueueSuccess({ queue })),
          catchError(err => of(UnderwritingActions.loadPendingQueueFailure({ error: err.error?.message || 'Failed to load pending queue' })))
        )
      )
    )
  );

  loadMyCases$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UnderwritingActions.loadMyCases),
      switchMap(() =>
        this.underwritingApi.getMyCases().pipe(
          map(cases => UnderwritingActions.loadMyCasesSuccess({ cases })),
          catchError(err => of(UnderwritingActions.loadMyCasesFailure({ error: err.error?.message || 'Failed to load case history' })))
        )
      )
    )
  );

  startReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UnderwritingActions.startReview),
      switchMap(({ applicationId }) =>
        this.underwritingApi.startReview(applicationId).pipe(
          map(underCase => {
            this.notificationService.showInfo(`Review claimed for Application #${applicationId}`);
            return UnderwritingActions.startReviewSuccess({ underCase });
          }),
          catchError(err => {
            const msg = err.error?.message || 'Failed to start review';
            this.notificationService.showError(msg);
            return of(UnderwritingActions.startReviewFailure({ error: msg }));
          })
        )
      )
    )
  );

  assessRisk$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UnderwritingActions.assessRisk),
      switchMap(({ applicationId }) =>
        this.underwritingApi.assessRisk(applicationId).pipe(
          map(underCase => {
            this.notificationService.showSuccess(`Automated risk score computed: ${underCase.overallRiskScore}/100 (${underCase.riskLevel})`);
            return UnderwritingActions.assessRiskSuccess({ underCase });
          }),
          catchError(err => {
            const msg = err.error?.message || 'Failed to assess risk profile';
            this.notificationService.showError(msg);
            return of(UnderwritingActions.assessRiskFailure({ error: msg }));
          })
        )
      )
    )
  );

  approveApplication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UnderwritingActions.approveApplication),
      switchMap(({ applicationId, decision }) =>
        this.underwritingApi.approveApplication(applicationId, decision).pipe(
          map(underCase => {
            this.notificationService.showSuccess(`Application #${applicationId} APPROVED and quote generated!`);
            return UnderwritingActions.approveApplicationSuccess({ underCase });
          }),
          catchError(err => {
            const msg = err.error?.message || 'Failed to approve application';
            this.notificationService.showError(msg);
            return of(UnderwritingActions.approveApplicationFailure({ error: msg }));
          })
        )
      )
    )
  );

  rejectApplication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UnderwritingActions.rejectApplication),
      switchMap(({ applicationId, decision }) =>
        this.underwritingApi.rejectApplication(applicationId, decision).pipe(
          map(underCase => {
            this.notificationService.showWarning(`Application #${applicationId} REJECTED.`);
            return UnderwritingActions.rejectApplicationSuccess({ underCase });
          }),
          catchError(err => {
            const msg = err.error?.message || 'Failed to reject application';
            this.notificationService.showError(msg);
            return of(UnderwritingActions.rejectApplicationFailure({ error: msg }));
          })
        )
      )
    )
  );
}