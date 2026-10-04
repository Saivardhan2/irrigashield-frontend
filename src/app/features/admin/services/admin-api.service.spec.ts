import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AdminApiService } from './admin-api.service';
import { CreateUserRequest, CreatePlanRequest } from '../model/admin.models';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('AdminApiService', () => {
  let service: AdminApiService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdminApiService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AdminApiService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should create an underwriter or provider user', () => {
    const userReq: CreateUserRequest = {
      name: 'Neha Underwriter',
      email: 'neha.underwriter@irrigashield.com',
      password: 'Password123',
      role: 'UNDERWRITER'
    };

    service.createUser(userReq).subscribe(res => {
      expect(res.userId).toBe(2);
      expect(res.role).toBe('UNDERWRITER');
    });

    const req = httpTesting.expectOne('http://localhost:8080/api/admin/users');
    expect(req.request.method).toBe('POST');
    req.flush({ userId: 2, ...userReq, status: 'ACTIVE' });
  });

  it('should create a parametric insurance plan', () => {
    const planReq: CreatePlanRequest = {
      planName: 'Sugarcane Drought Shield',
      description: 'Water deficit protection',
      minimumCoverage: 50000,
      maximumCoverage: 500000,
      basePremium: 3000,
      maximumPolicyDays: 180
    };

    service.createPlan(planReq).subscribe(res => {
      expect(res.planId).toBe(1);
      expect(res.planName).toBe('Sugarcane Drought Shield');
    });

    const req = httpTesting.expectOne('http://localhost:8080/api/admin/plans');
    expect(req.request.method).toBe('POST');
    req.flush({ planId: 1, ...planReq, status: 'ACTIVE', createdBy: 1 });
  });
});