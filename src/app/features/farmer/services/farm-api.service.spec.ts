import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { FarmApiService } from './farm-api.service';
import { FarmRequest, FarmResponse } from '../model/farm.models';
import { CropRequest, CropResponse } from '../model/crop.models';
import { IrrigationProfileRequest, IrrigationProfileResponse } from '../model/irrigation.models';

describe('FarmApiService', () => {
  let service: FarmApiService;
  let httpMock: HttpTestingController;

  const mockFarm: FarmResponse = {
    farmId: 1,
    farmerId: 1,
    farmName: 'Krishna Valley Farm',
    surveyNumber: 'SY-88/1A',
    addressLine: 'Canal Road, Sector 3',
    village: 'Baramati',
    district: 'Pune',
    state: 'Maharashtra',
    postalCode: '413102',
    areaInAcres: 12.50,
    soilType: 'Loamy Black Soil',
    ownershipType: 'OWNED',
    latitude: 18.1512,
    longitude: 74.5771,
    status: 'ACTIVE'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FarmApiService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(FarmApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should post new farm', () => {
    const reqData: FarmRequest = { ...mockFarm };
    service.createFarm(reqData).subscribe(res => {
      expect(res).toEqual(mockFarm);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/farms');
    expect(req.request.method).toBe('POST');
    req.flush(mockFarm);
  });

  it('should get my farms', () => {
    service.getMyFarms().subscribe(res => {
      expect(res.length).toBe(1);
      expect(res[0]).toEqual(mockFarm);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/farms/my-farms');
    expect(req.request.method).toBe('GET');
    req.flush([mockFarm]);
  });
});