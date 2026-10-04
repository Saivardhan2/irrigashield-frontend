import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { AuthApiService } from './auth-api.service';
import { AuthResponse, UserResponse } from '../model/auth.models';

describe('AuthApiService', () => {
  let service: AuthApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthApiService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AuthApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should post login credentials and return AuthResponse', () => {
    const mockResponse: AuthResponse = {
      tokenType: 'Cookie',
      expiresIn: 3600,
      user: { userId: 1, name: 'Admin', email: 'admin@irrigashield.com', role: 'ADMIN', status: 'ACTIVE' }
    };

    service.login({ email: 'admin@irrigashield.com', password: 'Password123' }).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should post registration request and return UserResponse', () => {
    const mockUser: UserResponse = {
      userId: 2,
      name: 'Ramesh Kumar',
      email: 'ramesh@example.com',
      role: 'FARMER',
      status: 'ACTIVE'
    };

    service.register({ name: 'Ramesh Kumar', email: 'ramesh@example.com', password: 'Password123' }).subscribe(res => {
      expect(res).toEqual(mockUser);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/auth/register');
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  it('should post logout', () => {
    service.logout().subscribe();
    const req = httpMock.expectOne('http://localhost:8080/api/auth/logout');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should get current user from /api/users/me', () => {
    const mockUser: UserResponse = {
      userId: 2,
      name: 'Ramesh Kumar',
      email: 'ramesh@example.com',
      role: 'FARMER',
      status: 'ACTIVE'
    };

    service.getCurrentUser().subscribe(res => {
      expect(res).toEqual(mockUser);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users/me');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });
});

