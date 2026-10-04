import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClaimsApiService } from '../services/claims-api.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { ClaimsActions } from './claims.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';

@Injectable()
export class ClaimsEffects {
  private actions$ = inject(Actions);
  private claimsApi = inject(ClaimsApiService);
  private notification = inject(NotificationService);

  submitReading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClaimsActions.submitReading),
      switchMap(({ request }) =>
        this.claimsApi.submitReading(request).pipe(
          map(response => {
            this.notification.showSuccess('IoT sensor reading processed successfully.');
            return ClaimsActions.submitReadingSuccess({ response });
          }),
          catchError(err => {
            const errorMsg = err?.error?.message || 'Failed to submit sensor reading.';
            this.notification.showError(errorMsg);
            return of(ClaimsActions.submitReadingFailure({ error: errorMsg }));
          })
        )
      )
    )
  );

  loadMyClaims$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClaimsActions.loadMyClaims),
      switchMap(() =>
        this.claimsApi.getMyClaims().pipe(
          map(claims => ClaimsActions.loadMyClaimsSuccess({ claims })),
          catchError(err => of(ClaimsActions.loadMyClaimsFailure({ error: err?.error?.message || 'Failed to load claims' })))
        )
      )
    )
  );

  loadAllClaims$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClaimsActions.loadAllClaims),
      switchMap(() =>
        this.claimsApi.getAllClaims().pipe(
          map(claims => ClaimsActions.loadAllClaimsSuccess({ claims })),
          catchError(err => of(ClaimsActions.loadAllClaimsFailure({ error: err?.error?.message || 'Failed to load all claims' })))
        )
      )
    )
  );

  settleClaim$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClaimsActions.settleClaim),
      switchMap(({ claimId }) =>
        this.claimsApi.settleClaim(claimId).pipe(
          map(claim => {
            this.notification.showSuccess(`Claim #${claim.claimId} settled for â‚¹${claim.payoutAmount}.`);
            return ClaimsActions.settleClaimSuccess({ claim });
          }),
          catchError(err => {
            const errorMsg = err?.error?.message || 'Settlement failed.';
            this.notification.showError(errorMsg);
            return of(ClaimsActions.settleClaimFailure({ error: errorMsg }));
          })
        )
      )
    )
  );
}