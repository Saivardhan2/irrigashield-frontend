import { farmerReducer, initialFarmerState } from './farmer.reducer';
import { FarmerActions } from './farmer.actions';
import { FarmResponse } from '../model/farm.models';

describe('FarmerReducer', () => {
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

  it('should return initial state by default', () => {
    const action = { type: 'NOOP' } as any;
    const state = farmerReducer(initialFarmerState, action);
    expect(state).toEqual(initialFarmerState);
  });

  it('should set loading to true on loadFarms', () => {
    const action = FarmerActions.loadFarms();
    const state = farmerReducer(initialFarmerState, action);
    expect(state.loading).toBe(true);
  });
});