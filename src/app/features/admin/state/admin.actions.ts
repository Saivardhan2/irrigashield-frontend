import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { InsurancePlan } from '../../farmer/model/application.models';
import {
  UserSummary,
  CreateUserRequest,
  CreatePlanRequest,
  TriggerRuleRequest,
  TriggerRuleResponse,
  PayoutSlabRequest,
  PayoutSlabResponse
} from '../model/admin.models';

export const AdminActions = createActionGroup({
  source: 'Admin',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: UserSummary[] }>(),
    'Load Users Failure': props<{ error: string }>(),

    'Create User': props<{ request: CreateUserRequest }>(),
    'Create User Success': props<{ user: UserSummary }>(),
    'Create User Failure': props<{ error: string }>(),

    'Load Plans': emptyProps(),
    'Load Plans Success': props<{ plans: InsurancePlan[] }>(),
    'Load Plans Failure': props<{ error: string }>(),

    'Create Plan': props<{ request: CreatePlanRequest }>(),
    'Create Plan Success': props<{ plan: InsurancePlan }>(),
    'Create Plan Failure': props<{ error: string }>(),

    'Create Trigger Rule': props<{ planId: number; request: TriggerRuleRequest }>(),
    'Create Trigger Rule Success': props<{ rule: TriggerRuleResponse }>(),
    'Create Trigger Rule Failure': props<{ error: string }>(),

    'Create Payout Slab': props<{ triggerRuleId: number; request: PayoutSlabRequest }>(),
    'Create Payout Slab Success': props<{ slab: PayoutSlabResponse }>(),
    'Create Payout Slab Failure': props<{ error: string }>()
  }
});