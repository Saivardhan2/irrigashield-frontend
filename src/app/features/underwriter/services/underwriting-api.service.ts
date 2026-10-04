import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UnderwritingResponse, DecisionRequest } from '../model/underwriting.models';

@Injectable({
  providedIn: 'root'
})
export class UnderwritingApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/underwriting';

  getPendingApplications(): Observable<UnderwritingResponse[]> {
    return this.http.get<UnderwritingResponse[]>(`${this.baseUrl}/applications/pending`);
  }

  getMyCases(): Observable<UnderwritingResponse[]> {
    return this.http.get<UnderwritingResponse[]>(`${this.baseUrl}/my-cases`);
  }

  startReview(applicationId: number): Observable<UnderwritingResponse> {
    return this.http.post<UnderwritingResponse>(`${this.baseUrl}/applications/${applicationId}/start-review`, {});
  }

  assessRisk(applicationId: number): Observable<UnderwritingResponse> {
    return this.http.post<UnderwritingResponse>(`${this.baseUrl}/applications/${applicationId}/assess`, {});
  }

  approveApplication(applicationId: number, req: DecisionRequest): Observable<UnderwritingResponse> {
    return this.http.put<UnderwritingResponse>(`${this.baseUrl}/applications/${applicationId}/approve`, req);
  }

  rejectApplication(applicationId: number, req: DecisionRequest): Observable<UnderwritingResponse> {
    return this.http.put<UnderwritingResponse>(`${this.baseUrl}/applications/${applicationId}/reject`, req);
  }
}