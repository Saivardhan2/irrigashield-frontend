import { createReducer, on } from '@ngrx/store';
import { AdminActions } from './admin.actions';
import { InsurancePlan } from '../../farmer/model/application.models';
import {
  UserSummary,
  TriggerRuleResponse,
  PayoutSlabResponse
} from '../model/admin.models';

export interface AdminState {
  users: UserSummary[];
  plans: InsurancePlan[];
  rules: TriggerRuleResponse[];
  slabs: PayoutSlabResponse[];
  loading: boolean;
  error: string | null;
}

export const initialAdminState: AdminState = {
  users: [],
  plans: [],
  rules: [],
  slabs: [],
  loading: false,
  error: null
};

export const adminReducer = createReducer(
  initialAdminState,
  on(AdminActions.loadUsers, state => ({ ...state, loading: true, error: null })),
  on(AdminActions.loadUsersSuccess, (state, { users }) => ({ ...state, loading: false, users })),
  on(AdminActions.loadUsersFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(AdminActions.createUser, state => ({ ...state, loading: true, error: null })),
  on(AdminActions.createUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    users: [...state.users, user]
  })),
  on(AdminActions.createUserFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(AdminActions.loadPlans, state => ({ ...state, loading: true, error: null })),
  on(AdminActions.loadPlansSuccess, (state, { plans }) => ({ ...state, loading: false, plans })),
  on(AdminActions.loadPlansFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(AdminActions.createPlan, state => ({ ...state, loading: true, error: null })),
  on(AdminActions.createPlanSuccess, (state, { plan }) => ({
    ...state,
    loading: false,
    plans: [...state.plans, plan]
  })),
  on(AdminActions.createPlanFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(AdminActions.createTriggerRuleSuccess, (state, { rule }) => ({
    ...state,
    rules: [...state.rules, rule]
  })),

  on(AdminActions.createPayoutSlabSuccess, (state, { slab }) => ({
    ...state,
    slabs: [...state.slabs, slab]
  }))
);