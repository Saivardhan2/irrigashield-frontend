import { InsurancePlan } from '../../farmer/model/application.models';

export interface UserSummary {
  userId: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'FARMER' | 'UNDERWRITER' | 'DATA_PROVIDER' | 'CLAIMS_OFFICER';
  status: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface CreatePlanRequest {
  planName: string;
  description: string;
  minimumCoverage: number;
  maximumCoverage: number;
  basePremium: number;
  maximumPolicyDays: number;
}

export interface TriggerRuleRequest {
  cropType: string;
  growthStage: string;
  availabilityThresholdPercentage: number;
  minimumContinuousHours: number;
  rollingWindowDays: number;
  requiredShortageDays: number;
}

export interface TriggerRuleResponse extends TriggerRuleRequest {
  triggerRuleId: number;
  planId: number;
  status: string;
}

export interface PayoutSlabRequest {
  minimumDurationHours: number;
  maximumDurationHours: number;
  payoutPercentage: number;
}

export interface PayoutSlabResponse extends PayoutSlabRequest {
  payoutSlabId: number;
  triggerRuleId: number;
  status: string;
}