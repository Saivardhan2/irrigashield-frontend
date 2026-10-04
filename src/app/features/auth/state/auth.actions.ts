import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserResponse, LoginRequest, RegisterRequest } from '../model/auth.models';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{ credentials: LoginRequest }>(),
    'Login Success': props<{ user: UserResponse }>(),
    'Login Failure': props<{ error: string }>(),
    'Register': props<{ request: RegisterRequest }>(),
    'Register Success': props<{ user: UserResponse }>(),
    'Register Failure': props<{ error: string }>(),
    'Check Session': emptyProps(),
    'Session Active': props<{ user: UserResponse }>(),
    'Session Inactive': emptyProps(),
    'Logout': emptyProps(),
    'Logout Success': emptyProps()
  }
});

