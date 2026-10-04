import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { FarmerProfileApiService } from './farmer-profile-api.service';
import { FarmerProfileRequest, FarmerProfileResponse } from '../model/farmer.models';

describe('FarmerProfileApiService', () => {
  let service: FarmerProfileApiService;
  let httpMock: HttpTestingController;

  const mockProfileReq: FarmerProfileRequest = {
    fullName: 'Ramesh Kumar',
    phoneNumber: '9876543210',
    addressLine: 'Plot 42, Kisan Nagar',
    village: 'Baramati',
    district: 'Pune',
    state: 'Maharashtra',
    postalCode: '413102',
    bankAccountLastFour: '4321'
  };

  const mockProfileRes: FarmerProfileResponse = {
    farmerId: 1,
    authUserId: 4,
    email: 'ramesh.kumar@example.com',
    fullName: 'Ramesh Kumar',
    phoneNumber: '9876543210',
    addressLine: 'Plot 42, Kisan Nagar',
    village: 'Baramati',
    district: 'Pune',
    state: 'Maharashtra',
    postalCode: '413102',
    bankAccountLastFour: '4321',
    verificationStatus: 'VERIFIED'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FarmerProfileApiService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(FarmerProfileApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should post profile creation', () => {
    service.createProfile(mockProfileReq).subscribe(res => {
      expect(res).toEqual(mockProfileRes);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/farmers/profile');
    expect(req.request.method).toBe('POST');
    req.flush(mockProfileRes);
  });

  it('should get current profile', () => {
    service.getProfile().subscribe(res => {
      expect(res).toEqual(mockProfileRes);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/farmers/profile/me');
    expect(req.request.method).toBe('GET');
    req.flush(mockProfileRes);
  });
});