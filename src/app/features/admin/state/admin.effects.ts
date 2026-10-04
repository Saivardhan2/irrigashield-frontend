import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AdminApiService } from '../services/admin-api.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { AdminActions } from './admin.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class AdminEffects {
  private actions$ = inject(Actions);
  private adminApi = inject(AdminApiService);
  private notification = inject(NotificationService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadUsers),
      switchMap(() =>
        this.adminApi.getUsers().pipe(
          map(users => AdminActions.loadUsersSuccess({ users })),
          catchError(err => of(AdminActions.loadUsersFailure({ error: err?.error?.message || 'Failed to load users' })))
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.createUser),
      switchMap(({ request }) =>
        this.adminApi.createUser(request).pipe(
          map(user => {
            this.notification.showSuccess(`User ${user.name} (${user.role}) created successfully.`);
            return AdminActions.createUserSuccess({ user });
          }),
          catchError(err => {
            const errorMsg = err?.error?.message || 'Failed to create user.';
            this.notification.showError(errorMsg);
            return of(AdminActions.createUserFailure({ error: errorMsg }));
          })
        )
      )
    )
  );

  loadPlans$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadPlans),
      switchMap(() =>
        this.adminApi.getAllPlans().pipe(
          map(plans => AdminActions.loadPlansSuccess({ plans })),
          catchError(err => of(AdminActions.loadPlansFailure({ error: err?.error?.message || 'Failed to load plans' })))
        )
      )
    )
  );

  createPlan$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.createPlan),
      switchMap(({ request }) =>
        this.adminApi.createPlan(request).pipe(
          map(plan => {
            this.notification.showSuccess(`Plan "${plan.planName}" published.`);
            return AdminActions.createPlanSuccess({ plan });
          }),
          catchError(err => {
            const errorMsg = err?.error?.message || 'Failed to create plan.';
            this.notification.showError(errorMsg);
            return of(AdminActions.createPlanFailure({ error: errorMsg }));
          })
        )
      )
    )
  );

  createTriggerRule$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.createTriggerRule),
      switchMap(({ planId, request }) =>
        this.adminApi.createTriggerRule(planId, request).pipe(
          map(rule => {
            this.notification.showSuccess(`Trigger rule configured for ${rule.cropType} (${rule.growthStage}).`);
            return AdminActions.createTriggerRuleSuccess({ rule });
          }),
          catchError(err => {
            const errorMsg = err?.error?.message || 'Failed to create trigger rule.';
            this.notification.showError(errorMsg);
            return of(AdminActions.createTriggerRuleFailure({ error: errorMsg }));
          })
        )
      )
    )
  );

  createPayoutSlab$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.createPayoutSlab),
      switchMap(({ triggerRuleId, request }) =>
        this.adminApi.createPayoutSlab(triggerRuleId, request).pipe(
          map(slab => {
            this.notification.showSuccess(`Payout slab configured (${slab.payoutPercentage}%).`);
            return AdminActions.createPayoutSlabSuccess({ slab });
          }),
          catchError(err => {
            const errorMsg = err?.error?.message || 'Failed to create payout slab.';
            this.notification.showError(errorMsg);
            return of(AdminActions.createPayoutSlabFailure({ error: errorMsg }));
          })
        )
      )
    )
  );
}