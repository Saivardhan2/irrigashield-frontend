import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IrrigationReadingRequest, IrrigationReadingResponse, ClaimResponse } from '../model/claim.models';

export const ClaimsActions = createActionGroup({
  source: 'Claims',
  events: {
    'Submit Reading': props<{ request: IrrigationReadingRequest }>(),
    'Submit Reading Success': props<{ response: IrrigationReadingResponse }>(),
    'Submit Reading Failure': props<{ error: string }>(),

    'Load My Claims': emptyProps(),
    'Load My Claims Success': props<{ claims: ClaimResponse[] }>(),
    'Load My Claims Failure': props<{ error: string }>(),

    'Load All Claims': emptyProps(),
    'Load All Claims Success': props<{ claims: ClaimResponse[] }>(),
    'Load All Claims Failure': props<{ error: string }>(),

    'Settle Claim': props<{ claimId: number }>(),
    'Settle Claim Success': props<{ claim: ClaimResponse }>(),
    'Settle Claim Failure': props<{ error: string }>(),

    'Set Alert Claim': props<{ claim: ClaimResponse | null }>(),
    'Clear Claim Alert': emptyProps()
  }
});