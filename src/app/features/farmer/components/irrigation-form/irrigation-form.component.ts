import { Component, Input, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FarmerActions } from '../../state/farmer.actions';
import { selectIrrigationByFarmId, selectFarmerLoading } from '../../state/farmer.selectors';
import { 
  WaterSource, 
  BackupWaterSource, 
  IrrigationMethod, 
  EquipmentCondition, 
  SeasonalRisk, 
  MaintenanceFrequency 
} from '../../model/irrigation.models';

@Component({
  selector: 'app-irrigation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './irrigation-form.component.html',
  styleUrl: './irrigation-form.component.scss'
})
export class IrrigationFormComponent implements OnInit, OnChanges {
  @Input({ required: true }) farmId!: number;

  private fb = inject(FormBuilder);
  private store = inject(Store);

  irrigationMap$ = this.store.select(selectIrrigationByFarmId);
  loading$ = this.store.select(selectFarmerLoading);

  waterSources: WaterSource[] = ['BOREWELL', 'CANAL', 'WELL', 'RIVER', 'RESERVOIR', 'TANKER', 'RAINWATER'];
  backupSources: BackupWaterSource[] = ['BOREWELL', 'CANAL', 'WELL', 'RIVER', 'RESERVOIR', 'TANKER', 'RAINWATER', 'NONE'];
  methods: IrrigationMethod[] = ['DRIP', 'SPRINKLER', 'FLOOD', 'FURROW', 'MANUAL'];
  conditions: EquipmentCondition[] = ['GOOD', 'FAIR', 'POOR'];
  risks: SeasonalRisk[] = ['LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH'];
  frequencies: MaintenanceFrequency[] = ['MONTHLY', 'QUARTERLY', 'HALF_YEARLY', 'YEARLY', 'NONE'];

  irrigationForm: FormGroup = this.fb.group({
    waterSource: ['BOREWELL' as WaterSource, [Validators.required]],
    irrigationMethod: ['DRIP' as IrrigationMethod, [Validators.required]],
    equipmentCondition: ['GOOD' as EquipmentCondition, [Validators.required]],
    backupWaterSource: ['CANAL' as BackupWaterSource, [Validators.required]],
    historicalFailureCount: [0, [Validators.required, Validators.min(0)]],
    averageWaterAvailabilityPercentage: [75.0, [Validators.required, Validators.min(0), Validators.max(100)]],
    seasonalRisk: ['LOW' as SeasonalRisk, [Validators.required]],
    maintenanceFrequency: ['QUARTERLY' as MaintenanceFrequency, [Validators.required]],
    lastMaintenanceDate: ['2026-08-15', [Validators.required]]
  });

  ngOnInit(): void {
    if (this.farmId) {
      this.loadData();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['farmId'] && this.farmId) {
      this.loadData();
    }
  }

  private loadData(): void {
    this.store.dispatch(FarmerActions.loadIrrigation({ farmId: this.farmId }));
  }

  onSubmit(): void {
    if (this.irrigationForm.valid && this.farmId) {
      this.store.dispatch(FarmerActions.saveIrrigation({ 
        farmId: this.farmId, 
        irrigation: this.irrigationForm.value 
      }));
    } else {
      this.irrigationForm.markAllAsTouched();
    }
  }
}