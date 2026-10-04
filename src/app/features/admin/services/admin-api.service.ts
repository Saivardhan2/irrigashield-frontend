import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InsurancePlan } from '../../farmer/model/application.models';
import {
  UserSummary,
  CreateUserRequest,
  CreatePlanRequest,
  TriggerRuleRequest,
  TriggerRuleResponse,
  PayoutSlabRequest,
  PayoutSlabResponse
} from '../model/admin.models';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/admin';

  getUsers(): Observable<UserSummary[]> {
    return this.http.get<UserSummary[]>(`${this.baseUrl}/users`);
  }

  createUser(req: CreateUserRequest): Observable<UserSummary> {
    return this.http.post<UserSummary>(`${this.baseUrl}/users`, req);
  }

  getAllPlans(): Observable<InsurancePlan[]> {
    return this.http.get<InsurancePlan[]>(`${this.baseUrl}/plans`);
  }

  createPlan(req: CreatePlanRequest): Observable<InsurancePlan> {
    return this.http.post<InsurancePlan>(`${this.baseUrl}/plans`, req);
  }

  createTriggerRule(planId: number, req: TriggerRuleRequest): Observable<TriggerRuleResponse> {
    return this.http.post<TriggerRuleResponse>(`${this.baseUrl}/plans/${planId}/trigger-rules`, req);
  }

  createPayoutSlab(triggerRuleId: number, req: PayoutSlabRequest): Observable<PayoutSlabResponse> {
    return this.http.post<PayoutSlabResponse>(`${this.baseUrl}/trigger-rules/${triggerRuleId}/payout-slabs`, req);
  }
}