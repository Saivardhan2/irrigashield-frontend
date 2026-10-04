import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FarmerProfileRequest, FarmerProfileResponse } from '../model/farmer.models';

@Injectable({
  providedIn: 'root'
})
export class FarmerProfileApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/farmers/profile';

  createProfile(profile: FarmerProfileRequest): Observable<FarmerProfileResponse> {
    return this.http.post<FarmerProfileResponse>(this.baseUrl, profile);
  }

  getProfile(): Observable<FarmerProfileResponse> {
    return this.http.get<FarmerProfileResponse>(`${this.baseUrl}/me`);
  }

  updateProfile(profile: FarmerProfileRequest): Observable<FarmerProfileResponse> {
    return this.http.put<FarmerProfileResponse>(`${this.baseUrl}/me`, profile);
  }
}