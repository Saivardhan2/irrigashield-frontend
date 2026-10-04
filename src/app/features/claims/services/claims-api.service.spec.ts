import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ClaimsApiService } from './claims-api.service';
import { IrrigationReadingRequest, ClaimResponse } from '../model/claim.models';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('ClaimsApiService', () => {
  let service: ClaimsApiService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClaimsApiService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ClaimsApiService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should submit an irrigation reading', () => {
    const payload: IrrigationReadingRequest = {
      policyId: 1,
      readingTimestamp: '2026-10-01T06:00:00',
      waterDeficitPercentage: 75,
      continuousDeficitHours: 52,
      soilMoisturePercentage: 22.5
    };

    service.submitReading(payload).subscribe(res => {
      expect(res.readingId).toBe(1);
      expect(res.processed).toBe(true);
    });

    const req = httpTesting.expectOne('http://localhost:8080/api/readings');
    expect(req.request.method).toBe('POST');
    req.flush({ readingId: 1, ...payload, processed: true });
  });

  it('should fetch farmer claims', () => {
    const mockClaims: ClaimResponse[] = [
      {
        claimId: 1,
        policyId: 1,
        triggerEvent: 'WATER_DEFICIT_VEGETATIVE',
        payoutPercentage: 25,
        payoutAmount: 37500,
        status: 'APPROVED',
        settledAt: '2026-10-01T06:00:05'
      }
    ];

    service.getMyClaims().subscribe(claims => {
      expect(claims.length).toBe(1);
      expect(claims[0].claimId).toBe(1);
    });

    const req = httpTesting.expectOne('http://localhost:8080/api/claims/my-claims');
    expect(req.request.method).toBe('GET');
    req.flush(mockClaims);
  });
});