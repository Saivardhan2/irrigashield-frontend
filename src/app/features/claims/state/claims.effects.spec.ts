import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { ClaimsEffects } from './claims.effects';
import { ClaimsApiService } from '../services/claims-api.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { ClaimsActions } from './claims.actions';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('ClaimsEffects', () => {
  let actions$: Observable<Action>;
  let effects: ClaimsEffects;
  let claimsApiMock: any;
  let notificationMock: any;

  beforeEach(() => {
    claimsApiMock = {
      submitReading: vi.fn(),
      getMyClaims: vi.fn(),
      getAllClaims: vi.fn(),
      settleClaim: vi.fn()
    };

    notificationMock = {
      showSuccess: vi.fn(),
      showError: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        ClaimsEffects,
        provideMockActions(() => actions$),
        { provide: ClaimsApiService, useValue: claimsApiMock },
        { provide: NotificationService, useValue: notificationMock }
      ]
    });

    effects = TestBed.inject(ClaimsEffects);
  });

  it('should dispatch loadMyClaimsSuccess on loadMyClaims', async () => {
    const claims = [{ claimId: 1, policyId: 1, triggerEvent: 'WATER_DEFICIT', payoutPercentage: 25, payoutAmount: 25000, status: 'APPROVED' as const }];
    claimsApiMock.getMyClaims.mockReturnValue(of(claims));

    actions$ = of(ClaimsActions.loadMyClaims());
    const result = await new Promise(resolve => effects.loadMyClaims$.subscribe(resolve));
    expect(result).toEqual(ClaimsActions.loadMyClaimsSuccess({ claims }));
  });
});