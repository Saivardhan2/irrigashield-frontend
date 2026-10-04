import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FarmerActions } from './farmer.actions';
import { FarmerProfileApiService } from '../services/farmer-profile-api.service';
import { FarmApiService } from '../services/farm-api.service';
import { FarmerPolicyApiService } from '../services/farmer-policy-api.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class FarmerEffects {
  private actions$ = inject(Actions);
  private profileApi = inject(FarmerProfileApiService);
  private farmApi = inject(FarmApiService);
  private policyApi = inject(FarmerPolicyApiService);
  private notificationService = inject(NotificationService);

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FarmerActions.loadProfile),
      switchMap(() =>
        this.profileApi.getProfile().pipe(
          map(profile => FarmerActions.loadProfileSuccess({ profile })),
          catchError(err => of(FarmerActions.loadProfileFailure({ error: err.error?.message || 'Failed to load profile' })))
        )
      )
    )
  );

  saveProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FarmerActions.saveProfile),
      switchMap(({ profile }) =>
        this.profileApi.createProfile(profile).pipe(
          map(saved => {
            this.notificationService.showSuccess('Profile updated successfully!');
            return FarmerActions.saveProfileSuccess({ profile: saved });
          }),
          catchError(err => {
            const msg = err.error?.message || 'Failed to save profile';
            this.notificationService.showError(msg);
            return of(FarmerActions.saveProfileFailure({ error: msg }));
          })
        )
      )
    )
  );

  loadFarms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FarmerActions.loadFarms),
      switchMap(() =>
        this.farmApi.getMyFarms().pipe(
          map(farms => FarmerActions.loadFarmsSuccess({ farms })),
          catchError(err => of(FarmerActions.loadFarmsFailure({ error: err.error?.message || 'Failed to load farms' })))
        )
      )
    )
  );

  createFarm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FarmerActions.createFarm),
      switchMap(({ farm }) =>
        this.farmApi.createFarm(farm).pipe(
          map(newFarm => {
            this.notificationService.showSuccess(`Farm "${newFarm.farmName}" registered!`);
            return FarmerActions.createFarmSuccess({ farm: newFarm });
          }),
          catchError(err => {
            const msg = err.error?.message || 'Failed to register farm';
            this.notificationService.showError(msg);
            return of(FarmerActions.createFarmFailure({ error: msg }));
          })
        )
      )
    )
  );

  loadCrops$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FarmerActions.loadCrops),
      switchMap(({ farmId }) =>
        this.farmApi.getCropsByFarm(farmId).pipe(
          map(crops => FarmerActions.loadCropsSuccess({ farmId, crops })),
          catchError(err => of(FarmerActions.loadCropsFailure({ error: err.error?.message || 'Failed to load crops' })))
        )
      )
    )
  );

  addCrop$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FarmerActions.addCrop),
      switchMap(({ farmId, crop }) =>
        this.farmApi.addCrop(farmId, crop).pipe(
          map(newCrop => {
            this.notificationService.showSuccess(`Crop "${newCrop.cropType}" added successfully!`);
            return FarmerActions.addCropSuccess({ crop: newCrop });
          }),
          catchError(err => {
            const msg = err.error?.message || 'Failed to add crop cycle';
            this.notificationService.showError(msg);
            return of(FarmerActions.addCropFailure({ error: msg }));
          })
        )
      )
    )
  );

  loadIrrigation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FarmerActions.loadIrrigation),
      switchMap(({ farmId }) =>
        this.farmApi.getIrrigationByFarm(farmId).pipe(
          map(irrigation => FarmerActions.loadIrrigationSuccess({ farmId, irrigation })),
          catchError(err => of(FarmerActions.loadIrrigationFailure({ error: err.error?.message || 'Failed to load irrigation profile' })))
        )
      )
    )
  );

  saveIrrigation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FarmerActions.saveIrrigation),
      switchMap(({ farmId, irrigation }) =>
        this.farmApi.createOrUpdateIrrigation(farmId, irrigation).pipe(
          map(saved => {
            this.notificationService.showSuccess('Irrigation infrastructure profile saved!');
            return FarmerActions.saveIrrigationSuccess({ irrigation: saved });
          }),
          catchError(err => {
            const msg = err.error?.message || 'Failed to save irrigation profile';
            this.notificationService.showError(msg);
            return of(FarmerActions.saveIrrigationFailure({ error: msg }));
          })
        )
      )
    )
  );

  loadActivePlans$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FarmerActions.loadActivePlans),
      switchMap(() =>
        this.policyApi.getActivePlans().pipe(
          map(plans => FarmerActions.loadActivePlansSuccess({ plans })),
          catchError(err => of(FarmerActions.loadActivePlansFailure({ error: err.error?.message || 'Failed to load insurance plans' })))
        )
      )
    )
  );

  loadApplications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FarmerActions.loadApplications),
      switchMap(() =>
        this.policyApi.getMyApplications().pipe(
          map(applications => FarmerActions.loadApplicationsSuccess({ applications })),
          catchError(err => of(FarmerActions.loadApplicationsFailure({ error: err.error?.message || 'Failed to load applications' })))
        )
      )
    )
  );

  createApplication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FarmerActions.createApplication),
      switchMap(({ application }) =>
        this.policyApi.createApplication(application).pipe(
          map(newApp => {
            this.notificationService.showSuccess('Insurance application draft created!');
            return FarmerActions.createApplicationSuccess({ application: newApp });
          }),
          catchError(err => {
            const msg = err.error?.message || 'Failed to create application';
            this.notificationService.showError(msg);
            return of(FarmerActions.createApplicationFailure({ error: msg }));
          })
        )
      )
    )
  );

  submitApplication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FarmerActions.submitApplication),
      switchMap(({ applicationId }) =>
        this.policyApi.submitApplication(applicationId).pipe(
          map(submitted => {
            this.notificationService.showSuccess('Application submitted for Underwriting review!');
            return FarmerActions.submitApplicationSuccess({ application: submitted });
          }),
          catchError(err => {
            const msg = err.error?.message || 'Failed to submit application. Ensure farm & crop details are complete.';
            this.notificationService.showError(msg);
            return of(FarmerActions.submitApplicationFailure({ error: msg }));
          })
        )
      )
    )
  );

  loadApprovedQuote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FarmerActions.loadApprovedQuote),
      switchMap(({ applicationId }) =>
        this.policyApi.getApprovedQuote(applicationId).pipe(
          map(quote => FarmerActions.loadApprovedQuoteSuccess({ quote })),
          catchError(err => of(FarmerActions.loadApprovedQuoteFailure({ error: err.error?.message || 'Failed to load approved quote' })))
        )
      )
    )
  );

  acceptQuote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FarmerActions.acceptQuote),
      switchMap(({ applicationId }) =>
        this.policyApi.acceptApprovedQuote(applicationId).pipe(
          map(policy => {
            this.notificationService.showSuccess(`Congratulations! Policy #${policy.policyId} is now ACTIVE!`);
            return FarmerActions.acceptQuoteSuccess({ policy });
          }),
          catchError(err => {
            const msg = err.error?.message || 'Failed to accept quote';
            this.notificationService.showError(msg);
            return of(FarmerActions.acceptQuoteFailure({ error: msg }));
          })
        )
      )
    )
  );

  loadMyPolicies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FarmerActions.loadMyPolicies),
      switchMap(() =>
        this.policyApi.getMyPolicies().pipe(
          map(policies => FarmerActions.loadMyPoliciesSuccess({ policies })),
          catchError(err => of(FarmerActions.loadMyPoliciesFailure({ error: err.error?.message || 'Failed to load policies' })))
        )
      )
    )
  );
}