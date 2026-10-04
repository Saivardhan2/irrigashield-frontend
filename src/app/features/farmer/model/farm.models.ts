export type OwnershipType = 'OWNED' | 'LEASED' | 'SHARED';

export interface FarmRequest {
  farmName: string;
  surveyNumber: string;
  addressLine: string;
  village: string;
  district: string;
  state: string;
  postalCode: string;
  areaInAcres: number;
  soilType: string;
  ownershipType: OwnershipType;
  latitude: number;
  longitude: number;
}

export interface FarmResponse {
  farmId: number;
  farmerId: number;
  farmName: string;
  surveyNumber: string;
  addressLine: string;
  village: string;
  district: string;
  state: string;
  postalCode: string;
  areaInAcres: number;
  soilType: string;
  ownershipType: OwnershipType;
  latitude: number;
  longitude: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}