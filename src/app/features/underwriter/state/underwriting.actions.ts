import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UnderwritingResponse, DecisionRequest } from '../model/underwriting.models';

export const UnderwritingActions = createActionGroup({
  source: 'Underwriting',
  events: {
    'Load Pending Queue': emptyProps(),
    'Load Pending Queue Success': props<{ queue: UnderwritingResponse[] }>(),
    'Load Pending Queue Failure': props<{ error: string }>(),

    'Load My Cases': emptyProps(),
    'Load My Cases Success': props<{ cases: UnderwritingResponse[] }>(),
    'Load My Cases Failure': props<{ error: string }>(),

    'Start Review': props<{ applicationId: number }>(),
    'Start Review Success': props<{ underCase: UnderwritingResponse }>(),
    'Start Review Failure': props<{ error: string }>(),

    'Assess Risk': props<{ applicationId: number }>(),
    'Assess Risk Success': props<{ underCase: UnderwritingResponse }>(),
    'Assess Risk Failure': props<{ error: string }>(),

    'Approve Application': props<{ applicationId: number; decision: DecisionRequest }>(),
    'Approve Application Success': props<{ underCase: UnderwritingResponse }>(),
    'Approve Application Failure': props<{ error: string }>(),

    'Reject Application': props<{ applicationId: number; decision: DecisionRequest }>(),
    'Reject Application Success': props<{ underCase: UnderwritingResponse }>(),
    'Reject Application Failure': props<{ error: string }>(),

    'Select Active Case': props<{ underCase: UnderwritingResponse | null }>()
  }
});