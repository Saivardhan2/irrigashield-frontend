import { Component, Input, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FarmerActions } from '../../state/farmer.actions';
import { selectCropsByFarmId, selectFarmerLoading } from '../../state/farmer.selectors';
import { dateSequenceValidator } from '../../../../shared/validators/date-sequence.validator';
import { GrowthStage, IrrigationRequirement } from '../../model/crop.models';
import { StatusBadgeDirective } from '../../../../shared/directives/status-badge.directive';

@Component({
  selector: 'app-crop-manager',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StatusBadgeDirective],
  templateUrl: './crop-manager.component.html',
  styleUrl: './crop-manager.component.scss'
})
export class CropManagerComponent implements OnInit, OnChanges {
  @Input({ required: true }) farmId!: number;

  private fb = inject(FormBuilder);
  private store = inject(Store);

  cropsMap$ = this.store.select(selectCropsByFarmId);
  loading$ = this.store.select(selectFarmerLoading);

  showAddForm = false;

  growthStages: GrowthStage[] = ['SOWING', 'GERMINATION', 'VEGETATIVE', 'FLOWERING', 'FRUITING', 'MATURITY'];
  irrigationReqs: IrrigationRequirement[] = ['LOW', 'MEDIUM', 'HIGH'];

  cropForm: FormGroup = this.fb.group({
    cropType: ['', [Validators.required, Validators.minLength(2)]],
    variety: ['', [Validators.required]],
    sowingDate: ['', [Validators.required]],
    expectedHarvestDate: ['', [Validators.required]],
    growthStage: ['VEGETATIVE' as GrowthStage, [Validators.required]],
    irrigationRequirement: ['HIGH' as IrrigationRequirement, [Validators.required]]
  }, { validators: dateSequenceValidator('sowingDate', 'expectedHarvestDate') });

  ngOnInit(): void {
    if (this.farmId) {
      this.store.dispatch(FarmerActions.loadCrops({ farmId: this.farmId }));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['farmId'] && this.farmId) {
      this.store.dispatch(FarmerActions.loadCrops({ farmId: this.farmId }));
    }
  }

  onSubmit(): void {
    if (this.cropForm.valid && this.farmId) {
      this.store.dispatch(FarmerActions.addCrop({ farmId: this.farmId, crop: this.cropForm.value }));
      this.cropForm.reset({
        growthStage: 'VEGETATIVE',
        irrigationRequirement: 'HIGH'
      });
      this.showAddForm = false;
    } else {
      this.cropForm.markAllAsTouched();
    }
  }
}