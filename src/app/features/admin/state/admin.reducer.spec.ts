import { adminReducer, initialAdminState } from './admin.reducer';
import { AdminActions } from './admin.actions';
import { UserSummary } from '../model/admin.models';
import { describe, it, expect } from 'vitest';

describe('AdminReducer', () => {
  it('should return default state', () => {
    const action = { type: 'UNKNOWN' };
    const state = adminReducer(initialAdminState, action as any);
    expect(state).toEqual(initialAdminState);
  });

  it('should append new user on createUserSuccess', () => {
    const newUser: UserSummary = {
      userId: 2,
      name: 'Neha Underwriter',
      email: 'neha@test.com',
      role: 'UNDERWRITER',
      status: 'ACTIVE'
    };
    const state = adminReducer(initialAdminState, AdminActions.createUserSuccess({ user: newUser }));
    expect(state.users.length).toBe(1);
    expect(state.users[0].userId).toBe(2);
  });
});