import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest, UserResponse } from '../model/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api';

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, credentials);
  }

  register(request: RegisterRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.baseUrl}/auth/register`, request);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/auth/logout`, {});
  }

  getCurrentUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/users/me`);
  }
}

