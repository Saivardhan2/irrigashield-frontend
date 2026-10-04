import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ClaimsActions } from '../../state/claims.actions';
import { selectLastReading, selectClaimsLoading } from '../../state/claims.selectors';
import { IrrigationReadingRequest } from '../../model/claim.models';

@Component({
  selector: 'app-sensor-simulator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sensor-simulator.component.html',
  styleUrl: './sensor-simulator.component.scss'
})
export class SensorSimulatorComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  sensorForm!: FormGroup;
  lastReading$ = this.store.select(selectLastReading);
  loading$ = this.store.select(selectClaimsLoading);

  ngOnInit(): void {
    const nowIso = new Date().toISOString().substring(0, 19);
    this.sensorForm = this.fb.group({
      policyId: [1, [Validators.required, Validators.min(1)]],
      readingTimestamp: [nowIso, Validators.required],
      waterDeficitPercentage: [75.0, [Validators.required, Validators.min(0), Validators.max(100)]],
      continuousDeficitHours: [52, [Validators.required, Validators.min(0)]],
      soilMoisturePercentage: [22.5, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  setPreset(scenario: 'DROUGHT' | 'NORMAL' | 'SEVERE'): void {
    const nowIso = new Date().toISOString().substring(0, 19);
    if (scenario === 'DROUGHT') {
      this.sensorForm.patchValue({
        readingTimestamp: nowIso,
        waterDeficitPercentage: 75.0,
        continuousDeficitHours: 52,
        soilMoisturePercentage: 22.5
      });
    } else if (scenario === 'NORMAL') {
      this.sensorForm.patchValue({
        readingTimestamp: nowIso,
        waterDeficitPercentage: 15.0,
        continuousDeficitHours: 0,
        soilMoisturePercentage: 65.0
      });
    } else if (scenario === 'SEVERE') {
      this.sensorForm.patchValue({
        readingTimestamp: nowIso,
        waterDeficitPercentage: 90.0,
        continuousDeficitHours: 80,
        soilMoisturePercentage: 12.0
      });
    }
  }

  onSubmit(): void {
    if (this.sensorForm.invalid) return;
    const req: IrrigationReadingRequest = this.sensorForm.value;
    this.store.dispatch(ClaimsActions.submitReading({ request: req }));
  }
}