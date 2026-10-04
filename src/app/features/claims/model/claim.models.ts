export interface IrrigationReadingRequest {
  policyId: number;
  readingTimestamp: string;
  waterDeficitPercentage: number;
  continuousDeficitHours: number;
  soilMoisturePercentage: number;
}

export interface IrrigationReadingResponse {
  readingId: number;
  policyId: number;
  readingTimestamp: string;
  waterDeficitPercentage: number;
  continuousDeficitHours: number;
  soilMoisturePercentage: number;
  processed: boolean;
}

export interface ClaimResponse {
  claimId: number;
  policyId: number;
  triggerEvent: string;
  payoutPercentage: number;
  payoutAmount: number;
  status: 'PENDING' | 'APPROVED' | 'SETTLED' | 'REJECTED';
  settledAt?: string;
  remarks?: string;
  createdAt?: string;
}