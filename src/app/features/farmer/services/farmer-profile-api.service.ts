import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FarmerProfileRequest, FarmerProfileResponse } from '../model/farmer.models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FarmerProfileApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.farmerProfileUrl;

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