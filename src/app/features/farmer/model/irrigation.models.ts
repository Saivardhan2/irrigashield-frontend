export type WaterSource = 
  | 'BOREWELL' 
  | 'CANAL' 
  | 'WELL' 
  | 'RIVER' 
  | 'RESERVOIR' 
  | 'TANKER' 
  | 'RAINWATER';

export type BackupWaterSource = WaterSource | 'NONE';

export type IrrigationMethod = 'DRIP' | 'SPRINKLER' | 'FLOOD' | 'FURROW' | 'MANUAL';

export type EquipmentCondition = 'GOOD' | 'FAIR' | 'POOR';

export type SeasonalRisk = 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';

export type MaintenanceFrequency = 'MONTHLY' | 'QUARTERLY' | 'HALF_YEARLY' | 'YEARLY' | 'NONE';

export interface IrrigationProfileRequest {
  waterSource: WaterSource;
  irrigationMethod: IrrigationMethod;
  equipmentCondition: EquipmentCondition;
  backupWaterSource: BackupWaterSource;
  historicalFailureCount: number;
  averageWaterAvailabilityPercentage: number;
  seasonalRisk: SeasonalRisk;
  maintenanceFrequency: MaintenanceFrequency;
  lastMaintenanceDate: string;
}

export interface IrrigationProfileResponse {
  irrigationId: number;
  farmId: number;
  waterSource: WaterSource;
  irrigationMethod: IrrigationMethod;
  equipmentCondition: EquipmentCondition;
  backupWaterSource: BackupWaterSource;
  historicalFailureCount: number;
  averageWaterAvailabilityPercentage: number;
  seasonalRisk: SeasonalRisk;
  maintenanceFrequency: MaintenanceFrequency;
  lastMaintenanceDate: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}