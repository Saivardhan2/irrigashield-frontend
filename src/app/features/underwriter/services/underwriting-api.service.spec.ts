import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { UnderwritingApiService } from './underwriting-api.service';
import { UnderwritingResponse } from '../model/underwriting.models';

describe('UnderwritingApiService', () => {
  let service: UnderwritingApiService;
  let httpMock: HttpTestingController;

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
    TestBed.configureTestingModule({
      providers: [
        UnderwritingApiService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(UnderwritingApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch pending applications', () => {
    service.getPendingApplications().subscribe(res => {
      expect(res).toEqual([mockCase]);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/underwriting/applications/pending');
    expect(req.request.method).toBe('GET');
    req.flush([mockCase]);
  });

  it('should start review', () => {
    service.startReview(1).subscribe(res => {
      expect(res.applicationStatus).toBe('UNDER_REVIEW');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/underwriting/applications/1/start-review');
    expect(req.request.method).toBe('POST');
    req.flush({ ...mockCase, applicationStatus: 'UNDER_REVIEW' });
  });

  it('should run automated risk assessment', () => {
    service.assessRisk(1).subscribe(res => {
      expect(res.overallRiskScore).toBe(20);
      expect(res.riskLevel).toBe('LOW');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/underwriting/applications/1/assess');
    expect(req.request.method).toBe('POST');
    req.flush({ ...mockCase, overallRiskScore: 20, riskLevel: 'LOW' });
  });
});