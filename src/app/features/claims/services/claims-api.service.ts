import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IrrigationReadingRequest, IrrigationReadingResponse, ClaimResponse } from '../model/claim.models';

@Injectable({
  providedIn: 'root'
})
export class ClaimsApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api';

  submitReading(request: IrrigationReadingRequest): Observable<IrrigationReadingResponse> {
    return this.http.post<IrrigationReadingResponse>(`${this.baseUrl}/readings`, request);
  }

  getMyClaims(): Observable<ClaimResponse[]> {
    return this.http.get<ClaimResponse[]>(`${this.baseUrl}/claims/my-claims`);
  }

  getAllClaims(): Observable<ClaimResponse[]> {
    return this.http.get<ClaimResponse[]>(`${this.baseUrl}/claims`);
  }

  getClaimById(claimId: number): Observable<ClaimResponse> {
    return this.http.get<ClaimResponse>(`${this.baseUrl}/claims/${claimId}`);
  }

  settleClaim(claimId: number): Observable<ClaimResponse> {
    return this.http.post<ClaimResponse>(`${this.baseUrl}/claims/${claimId}/settle`, {});
  }
}