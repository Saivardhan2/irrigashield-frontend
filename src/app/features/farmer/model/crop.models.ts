export type GrowthStage = 
  | 'SOWING' 
  | 'GERMINATION' 
  | 'VEGETATIVE' 
  | 'FLOWERING' 
  | 'FRUITING' 
  | 'MATURITY';

export type IrrigationRequirement = 'LOW' | 'MEDIUM' | 'HIGH';

export interface CropRequest {
  cropType: string;
  variety: string;
  sowingDate: string;
  expectedHarvestDate: string;
  growthStage: GrowthStage;
  irrigationRequirement: IrrigationRequirement;
}

export interface CropResponse {
  cropId: number;
  farmId: number;
  cropType: string;
  variety: string;
  sowingDate: string;
  expectedHarvestDate: string;
  growthStage: GrowthStage;
  irrigationRequirement: IrrigationRequirement;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}