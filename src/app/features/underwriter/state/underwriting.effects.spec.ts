import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, firstValueFrom } from 'rxjs';
import { vi } from 'vitest';
import { UnderwritingEffects } from './underwriting.effects';
import { UnderwritingApiService } from '../services/underwriting-api.service';
import { UnderwritingActions } from './underwriting.actions';
import { NotificationService } from '../../../shared/services/notification.service';
import { UnderwritingResponse } from '../model/underwriting.models';

describe('UnderwritingEffects', () => {
  let actions$: Observable<any>;
  let effects: UnderwritingEffects;
  let underwritingApi: any;

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

  beforeEach(() => {
    underwritingApi = {
      getPendingApplications: vi.fn(),
      startReview: vi.fn(),
      assessRisk: vi.fn(),
      approveApplication: vi.fn(),
      rejectApplication: vi.fn(),
      getMyCases: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        UnderwritingEffects,
        provideMockActions(() => actions$),
        { provide: UnderwritingApiService, useValue: underwritingApi },
        NotificationService
      ]
    });

    effects = TestBed.inject(UnderwritingEffects);
  });

  it('should emit loadPendingQueueSuccess on loadPendingQueue', async () => {
    underwritingApi.getPendingApplications.mockReturnValue(of([mockCase]));
    actions$ = of(UnderwritingActions.loadPendingQueue());

    const result = await firstValueFrom(effects.loadPendingQueue$);
    expect(result).toEqual(UnderwritingActions.loadPendingQueueSuccess({ queue: [mockCase] }));
  });
});