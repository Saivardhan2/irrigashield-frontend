import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FarmerProfileRequest, FarmerProfileResponse } from '../model/farmer.models';
import { FarmRequest, FarmResponse } from '../model/farm.models';
import { CropRequest, CropResponse } from '../model/crop.models';
import { IrrigationProfileRequest, IrrigationProfileResponse } from '../model/irrigation.models';
import { 
  InsurancePlanResponse, 
  PolicyApplicationRequest, 
  PolicyApplicationResponse, 
  PolicyResponse 
} from '../model/application.models';

export const FarmerActions = createActionGroup({
  source: 'Farmer',
  events: {
    'Load Profile': emptyProps(),
    'Load Profile Success': props<{ profile: FarmerProfileResponse }>(),
    'Load Profile Failure': props<{ error: string }>(),
    'Save Profile': props<{ profile: FarmerProfileRequest }>(),
    'Save Profile Success': props<{ profile: FarmerProfileResponse }>(),
    'Save Profile Failure': props<{ error: string }>(),

    'Load Farms': emptyProps(),
    'Load Farms Success': props<{ farms: FarmResponse[] }>(),
    'Load Farms Failure': props<{ error: string }>(),
    'Create Farm': props<{ farm: FarmRequest }>(),
    'Create Farm Success': props<{ farm: FarmResponse }>(),
    'Create Farm Failure': props<{ error: string }>(),
    'Select Farm': props<{ farmId: number }>(),

    'Load Crops': props<{ farmId: number }>(),
    'Load Crops Success': props<{ farmId: number; crops: CropResponse[] }>(),
    'Load Crops Failure': props<{ error: string }>(),
    'Add Crop': props<{ farmId: number; crop: CropRequest }>(),
    'Add Crop Success': props<{ crop: CropResponse }>(),
    'Add Crop Failure': props<{ error: string }>(),

    'Load Irrigation': props<{ farmId: number }>(),
    'Load Irrigation Success': props<{ farmId: number; irrigation: IrrigationProfileResponse }>(),
    'Load Irrigation Failure': props<{ error: string }>(),
    'Save Irrigation': props<{ farmId: number; irrigation: IrrigationProfileRequest }>(),
    'Save Irrigation Success': props<{ irrigation: IrrigationProfileResponse }>(),
    'Save Irrigation Failure': props<{ error: string }>(),

    'Load Active Plans': emptyProps(),
    'Load Active Plans Success': props<{ plans: InsurancePlanResponse[] }>(),
    'Load Active Plans Failure': props<{ error: string }>(),

    'Load Applications': emptyProps(),
    'Load Applications Success': props<{ applications: PolicyApplicationResponse[] }>(),
    'Load Applications Failure': props<{ error: string }>(),
    'Create Application': props<{ application: PolicyApplicationRequest }>(),
    'Create Application Success': props<{ application: PolicyApplicationResponse }>(),
    'Create Application Failure': props<{ error: string }>(),
    'Submit Application': props<{ applicationId: number }>(),
    'Submit Application Success': props<{ application: PolicyApplicationResponse }>(),
    'Submit Application Failure': props<{ error: string }>(),

    'Load Approved Quote': props<{ applicationId: number }>(),
    'Load Approved Quote Success': props<{ quote: PolicyResponse }>(),
    'Load Approved Quote Failure': props<{ error: string }>(),
    'Accept Quote': props<{ applicationId: number }>(),
    'Accept Quote Success': props<{ policy: PolicyResponse }>(),
    'Accept Quote Failure': props<{ error: string }>(),
    'Load My Policies': emptyProps(),
    'Load My Policies Success': props<{ policies: PolicyResponse[] }>(),
    'Load My Policies Failure': props<{ error: string }>()
  }
});