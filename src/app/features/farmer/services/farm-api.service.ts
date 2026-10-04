import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FarmRequest, FarmResponse } from '../model/farm.models';
import { CropRequest, CropResponse } from '../model/crop.models';
import { IrrigationProfileRequest, IrrigationProfileResponse } from '../model/irrigation.models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FarmApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.farmsUrl;

  createFarm(farm: FarmRequest): Observable<FarmResponse> {
    return this.http.post<FarmResponse>(this.baseUrl, farm);
  }

  getMyFarms(): Observable<FarmResponse[]> {
    return this.http.get<FarmResponse[]>(`${this.baseUrl}/my-farms`);
  }

  getFarmById(farmId: number): Observable<FarmResponse> {
    return this.http.get<FarmResponse>(`${this.baseUrl}/${farmId}`);
  }

  updateFarm(farmId: number, farm: FarmRequest): Observable<FarmResponse> {
    return this.http.put<FarmResponse>(`${this.baseUrl}/${farmId}`, farm);
  }

  addCrop(farmId: number, crop: CropRequest): Observable<CropResponse> {
    return this.http.post<CropResponse>(`${this.baseUrl}/${farmId}/crops`, crop);
  }

  getCropsByFarm(farmId: number): Observable<CropResponse[]> {
    return this.http.get<CropResponse[]>(`${this.baseUrl}/${farmId}/crops`);
  }

  getCropById(farmId: number, cropId: number): Observable<CropResponse> {
    return this.http.get<CropResponse>(`${this.baseUrl}/${farmId}/crops/${cropId}`);
  }

  updateCrop(farmId: number, cropId: number, crop: CropRequest): Observable<CropResponse> {
    return this.http.put<CropResponse>(`${this.baseUrl}/${farmId}/crops/${cropId}`, crop);
  }

  createOrUpdateIrrigation(farmId: number, irrigation: IrrigationProfileRequest): Observable<IrrigationProfileResponse> {
    return this.http.post<IrrigationProfileResponse>(`${this.baseUrl}/${farmId}/irrigation`, irrigation);
  }

  getIrrigationByFarm(farmId: number): Observable<IrrigationProfileResponse> {
    return this.http.get<IrrigationProfileResponse>(`${this.baseUrl}/${farmId}/irrigation`);
  }

  getRiskProfile(farmId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${farmId}/risk-profile`);
  }
}