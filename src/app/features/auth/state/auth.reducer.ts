import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { UserResponse } from '../model/auth.models';

export interface AuthState {
  user: UserResponse | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export const initialAuthState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, AuthActions.register, AuthActions.checkSession, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.loginSuccess, AuthActions.sessionActive, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    isAuthenticated: true,
    error: null
  })),
  on(AuthActions.registerSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    isAuthenticated: false, // After self-registration, user logs in with credentials
    error: null
  })),
  on(AuthActions.loginFailure, AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    isAuthenticated: false
  })),
  on(AuthActions.logoutSuccess, AuthActions.sessionInactive, () => ({
    ...initialAuthState
  }))
);

