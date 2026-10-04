export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'VERY_HIGH';

export interface DecisionRequest {
  remarks: string;
}

export interface UnderwritingResponse {
  caseId: number | null;
  applicationId: number;
  farmerUserId: number;
  farmerEmail: string;
  farmId: number;
  cropId: number;
  planId: number;
  planName: string;
  requestedCoverage: number;
  proposedStartDate: string;
  proposedEndDate: string;
  applicationStatus: string;
  underwriterUserId?: number | null;
  underwriterEmail?: string | null;
  waterAvailabilityScore?: number | null;
  equipmentConditionScore?: number | null;
  historicalFailureScore?: number | null;
  seasonalRiskScore?: number | null;
  backupSourceScore?: number | null;
  overallRiskScore?: number | null;
  riskLevel?: RiskLevel | null;
  basePremium?: number | null;
  riskLoading?: number | null;
  recommendedPremium?: number | null;
  recommendedCoverage?: number | null;
  decision?: string | null;
  remarks?: string | null;
  underwritingStatus?: string | null;
  reviewStartedAt?: string | null;
  reviewCompletedAt?: string | null;
}