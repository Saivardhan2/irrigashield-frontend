import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { FarmerPolicyApiService } from './farmer-policy-api.service';
import { InsurancePlanResponse, PolicyResponse } from '../model/application.models';

describe('FarmerPolicyApiService', () => {
  let service: FarmerPolicyApiService;
  let httpMock: HttpTestingController;

  const mockPlan: InsurancePlanResponse = {
    planId: 1,
    planName: 'Sugarcane Drought Shield',
    description: 'Parametric water deficit insurance covering vegetative and maturity stages.',
    minimumCoverage: 50000,
    maximumCoverage: 500000,
    basePremium: 3000,
    maximumPolicyDays: 180,
    status: 'ACTIVE'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FarmerPolicyApiService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(FarmerPolicyApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch active insurance plans', () => {
    service.getActivePlans().subscribe(res => {
      expect(res).toEqual([mockPlan]);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/plans/active');
    expect(req.request.method).toBe('GET');
    req.flush([mockPlan]);
  });
});