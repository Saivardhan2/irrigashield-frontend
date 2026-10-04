import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { AdminEffects } from './admin.effects';
import { AdminApiService } from '../services/admin-api.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { AdminActions } from './admin.actions';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('AdminEffects', () => {
  let actions$: Observable<Action>;
  let effects: AdminEffects;
  let adminApiMock: any;
  let notificationMock: any;

  beforeEach(() => {
    adminApiMock = {
      getUsers: vi.fn(),
      createUser: vi.fn(),
      getAllPlans: vi.fn(),
      createPlan: vi.fn(),
      createTriggerRule: vi.fn(),
      createPayoutSlab: vi.fn()
    };

    notificationMock = {
      showSuccess: vi.fn(),
      showError: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        AdminEffects,
        provideMockActions(() => actions$),
        { provide: AdminApiService, useValue: adminApiMock },
        { provide: NotificationService, useValue: notificationMock }
      ]
    });

    effects = TestBed.inject(AdminEffects);
  });

  it('should load users on loadUsers action', async () => {
    const users = [{ userId: 1, name: 'Admin', email: 'admin@test.com', role: 'ADMIN' as const, status: 'ACTIVE' }];
    adminApiMock.getUsers.mockReturnValue(of(users));

    actions$ = of(AdminActions.loadUsers());
    const result = await new Promise(resolve => effects.loadUsers$.subscribe(resolve));
    expect(result).toEqual(AdminActions.loadUsersSuccess({ users }));
  });
});