import { authReducer, initialAuthState } from './auth.reducer';
import { AuthActions } from './auth.actions';
import { UserResponse } from '../model/auth.models';

describe('AuthReducer', () => {
  it('should return initial state by default', () => {
    const action = { type: 'NOOP' } as any;
    const state = authReducer(initialAuthState, action);
    expect(state).toEqual(initialAuthState);
  });

  it('should set loading to true on login action', () => {
    const action = AuthActions.login({ credentials: { email: 'ramesh@example.com', password: 'Password123' } });
    const state = authReducer(initialAuthState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should store user and set isAuthenticated to true on loginSuccess', () => {
    const mockUser: UserResponse = {
      userId: 1,
      name: 'Ramesh Kumar',
      email: 'ramesh@example.com',
      role: 'FARMER',
      status: 'ACTIVE'
    };
    const action = AuthActions.loginSuccess({ user: mockUser });
    const state = authReducer(initialAuthState, action);

    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(mockUser);
    expect(state.loading).toBe(false);
  });

  it('should reset state on logoutSuccess', () => {
    const loggedInState = {
      user: { userId: 1, name: 'Admin', email: 'admin@irrigashield.com', role: 'ADMIN' as const, status: 'ACTIVE' as const },
      loading: false,
      error: null,
      isAuthenticated: true
    };
    const action = AuthActions.logoutSuccess();
    const state = authReducer(loggedInState, action);

    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });
});

