import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FarmerActions } from '../../state/farmer.actions';
import { selectFarmerLoading } from '../../state/farmer.selectors';
import { pinCodeValidator } from '../../../../shared/validators/pin-code.validator';
import { OwnershipType } from '../../model/farm.models';

@Component({
  selector: 'app-farm-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './farm-form.component.html',
  styleUrl: './farm-form.component.scss'
})
export class FarmFormComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  @Output() formCancelled = new EventEmitter<void>();
  @Output() farmSaved = new EventEmitter<void>();

  loading$ = this.store.select(selectFarmerLoading);
  ownershipTypes: OwnershipType[] = ['OWNED', 'LEASED', 'SHARED'];

  farmForm: FormGroup = this.fb.group({
    farmName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    surveyNumber: ['', [Validators.required]],
    addressLine: ['', [Validators.required]],
    village: ['', [Validators.required]],
    district: ['', [Validators.required]],
    state: ['', [Validators.required]],
    postalCode: ['', [Validators.required, pinCodeValidator()]],
    areaInAcres: [null, [Validators.required, Validators.min(0.1), Validators.max(1000)]],
    soilType: ['', [Validators.required]],
    ownershipType: ['OWNED' as OwnershipType, [Validators.required]],
    latitude: [18.1512, [Validators.required, Validators.min(-90), Validators.max(90)]],
    longitude: [74.5771, [Validators.required, Validators.min(-180), Validators.max(180)]]
  });

  onSubmit(): void {
    if (this.farmForm.valid) {
      this.store.dispatch(FarmerActions.createFarm({ farm: this.farmForm.value }));
      this.farmSaved.emit();
    } else {
      this.farmForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.formCancelled.emit();
  }
}