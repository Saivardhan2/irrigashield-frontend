import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  InsurancePlanResponse, 
  PolicyApplicationRequest, 
  PolicyApplicationResponse, 
  PolicyResponse 
} from '../model/application.models';

@Injectable({
  providedIn: 'root'
})
export class FarmerPolicyApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api';

  getActivePlans(): Observable<InsurancePlanResponse[]> {
    return this.http.get<InsurancePlanResponse[]>(`${this.baseUrl}/plans/active`);
  }

  getPlanById(planId: number): Observable<InsurancePlanResponse> {
    return this.http.get<InsurancePlanResponse>(`${this.baseUrl}/plans/${planId}`);
  }

  createApplication(app: PolicyApplicationRequest): Observable<PolicyApplicationResponse> {
    return this.http.post<PolicyApplicationResponse>(`${this.baseUrl}/applications`, app);
  }

  getMyApplications(): Observable<PolicyApplicationResponse[]> {
    return this.http.get<PolicyApplicationResponse[]>(`${this.baseUrl}/applications/my-applications`);
  }

  getApplicationById(applicationId: number): Observable<PolicyApplicationResponse> {
    return this.http.get<PolicyApplicationResponse>(`${this.baseUrl}/applications/${applicationId}`);
  }

  updateApplication(applicationId: number, app: PolicyApplicationRequest): Observable<PolicyApplicationResponse> {
    return this.http.put<PolicyApplicationResponse>(`${this.baseUrl}/applications/${applicationId}`, app);
  }

  submitApplication(applicationId: number): Observable<PolicyApplicationResponse> {
    return this.http.post<PolicyApplicationResponse>(`${this.baseUrl}/applications/${applicationId}/submit`, {});
  }

  getApprovedQuote(applicationId: number): Observable<PolicyResponse> {
    return this.http.get<PolicyResponse>(`${this.baseUrl}/policies/approved-quote/${applicationId}`);
  }

  acceptApprovedQuote(applicationId: number): Observable<PolicyResponse> {
    return this.http.post<PolicyResponse>(`${this.baseUrl}/policies/approved-quote/${applicationId}/accept`, {});
  }

  getMyPolicies(): Observable<PolicyResponse[]> {
    return this.http.get<PolicyResponse[]>(`${this.baseUrl}/policies/my-policies`);
  }
}