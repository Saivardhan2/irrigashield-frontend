export type ApplicationStatus = 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
export type PolicyStatus = 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
export type PaymentStatus = 'PAID' | 'PENDING' | 'FAILED';

export type InsurancePlan = InsurancePlanResponse;

export interface InsurancePlanResponse {
  planId: number;
  planName: string;
  description: string;
  minimumCoverage: number;
  maximumCoverage: number;
  basePremium: number;
  maximumPolicyDays: number;
  status: string;
  createdBy?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PolicyApplicationRequest {
  farmId: number;
  cropId: number;
  planId: number;
  requestedCoverage: number;
  proposedStartDate: string;
  proposedEndDate: string;
}

export interface PolicyApplicationResponse {
  applicationId: number;
  farmerUserId: number;
  farmerEmail: string;
  farmId: number;
  cropId: number;
  planId: number;
  planName?: string;
  requestedCoverage: number;
  proposedStartDate: string;
  proposedEndDate: string;
  status: ApplicationStatus;
  submittedAt: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface PolicyResponse {
  policyId: number | null;
  applicationId: number;
  farmerUserId: number;
  farmerEmail: string;
  farmId: number;
  cropId: number;
  planId: number;
  planName: string;
  coverageAmount: number;
  premiumAmount: number;
  startDate: string;
  endDate: string;
  paymentStatus: PaymentStatus;
  status: PolicyStatus | string;
  acceptedAt: string | null;
}