export interface IrrigationReadingRequest {
  policyId: number;
  availabilityPercentage?: number;
  recordedAt?: string;
  readingTimestamp?: string;
  waterDeficitPercentage?: number;
  continuousDeficitHours?: number;
  soilMoisturePercentage?: number;
}

export interface IrrigationReadingResponse {
  readingId?: number;
  policyId: number;
  availabilityPercentage?: number;
  recordedAt?: string;
  readingTimestamp?: string;
  waterDeficitPercentage?: number;
  continuousDeficitHours?: number;
  soilMoisturePercentage?: number;
  thresholdBreached?: boolean;
  claimStatus?: string;
  payoutStatus?: string;
  payoutPercentage?: number;
  compensationAmount?: number;
  payoutAmount?: number;
  processed?: boolean;
}

export interface ClaimResponse {
  claimId: number;
  policyId: number;
  triggerEvent?: string;
  triggerReason?: string;
  availabilityPercentage?: number;
  payoutPercentage: number;
  payoutAmount?: number;
  compensationAmount?: number;
  status?: string;
  claimStatus?: string;
  payoutStatus?: string;
  thresholdBreached?: boolean;
  settledAt?: string;
  recordedAt?: string;
  remarks?: string;
  createdAt?: string;
}