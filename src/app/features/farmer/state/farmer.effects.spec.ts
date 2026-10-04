import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, firstValueFrom } from 'rxjs';
import { vi } from 'vitest';
import { FarmerEffects } from './farmer.effects';
import { FarmApiService } from '../services/farm-api.service';
import { FarmerProfileApiService } from '../services/farmer-profile-api.service';
import { FarmerPolicyApiService } from '../services/farmer-policy-api.service';
import { FarmerActions } from './farmer.actions';
import { FarmResponse } from '../model/farm.models';
import { NotificationService } from '../../../shared/services/notification.service';

describe('FarmerEffects', () => {
  let actions$: Observable<any>;
  let effects: FarmerEffects;
  let farmApiService: any;

  const mockFarm: FarmResponse = {
    farmId: 1,
    farmerId: 1,
    farmName: 'Krishna Valley Farm',
    surveyNumber: 'SY-88/1A',
    addressLine: 'Canal Road',
    village: 'Baramati',
    district: 'Pune',
    state: 'Maharashtra',
    postalCode: '413102',
    areaInAcres: 12.50,
    soilType: 'Loamy Black',
    ownershipType: 'OWNED',
    latitude: 18.1512,
    longitude: 74.5771,
    status: 'ACTIVE'
  };

  beforeEach(() => {
    farmApiService = {
      getMyFarms: vi.fn(),
      createFarm: vi.fn(),
      getCropsByFarm: vi.fn(),
      getIrrigationByFarm: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        FarmerEffects,
        provideMockActions(() => actions$),
        { provide: FarmApiService, useValue: farmApiService },
        { provide: FarmerProfileApiService, useValue: {} },
        { provide: FarmerPolicyApiService, useValue: {} },
        NotificationService
      ]
    });

    effects = TestBed.inject(FarmerEffects);
  });

  it('should emit loadFarmsSuccess on loadFarms', async () => {
    farmApiService.getMyFarms.mockReturnValue(of([mockFarm]));
    actions$ = of(FarmerActions.loadFarms());

    const result = await firstValueFrom(effects.loadFarms$);
    expect(result).toEqual(FarmerActions.loadFarmsSuccess({ farms: [mockFarm] }));
  });
});