import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError, firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { vi } from 'vitest';
import { AuthEffects } from './auth.effects';
import { AuthApiService } from '../services/auth-api.service';
import { AuthActions } from './auth.actions';
import { UserResponse, AuthResponse } from '../model/auth.models';
import { NotificationService } from '../../../shared/services/notification.service';

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;
  let authApiService: any;
  let router: any;

  const mockUser: UserResponse = {
    userId: 1,
    name: 'Ramesh Kumar',
    email: 'ramesh@example.com',
    role: 'FARMER',
    status: 'ACTIVE'
  };

  const mockAuthResponse: AuthResponse = {
    tokenType: 'Cookie',
    expiresIn: 3600,
    user: mockUser
  };

  beforeEach(() => {
    authApiService = {
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
      getCurrentUser: vi.fn()
    };

    router = {
      navigate: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        { provide: AuthApiService, useValue: authApiService },
        { provide: Router, useValue: router },
        NotificationService
      ]
    });

    effects = TestBed.inject(AuthEffects);
  });

  it('should emit loginSuccess on successful login', async () => {
    authApiService.login.mockReturnValue(of(mockAuthResponse));
    actions$ = of(AuthActions.login({ credentials: { email: 'ramesh@example.com', password: 'P1' } }));

    const action = await firstValueFrom(effects.login$);
    expect(action).toEqual(AuthActions.loginSuccess({ user: mockUser }));
  });

  it('should emit loginFailure on failed login', async () => {
    authApiService.login.mockReturnValue(throwError(() => ({ error: { message: 'Invalid credentials' } })));
    actions$ = of(AuthActions.login({ credentials: { email: 'ramesh@example.com', password: 'bad' } }));

    const action = await firstValueFrom(effects.login$);
    expect(action).toEqual(AuthActions.loginFailure({ error: 'Invalid credentials' }));
  });
});

