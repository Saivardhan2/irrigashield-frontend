import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { FarmerActions } from '../../state/farmer.actions';
import { 
  selectActivePlans, 
  selectFarms, 
  selectCropsByFarmId, 
  selectMyApplications, 
  selectFarmerLoading 
} from '../../state/farmer.selectors';
import { dateSequenceValidator } from '../../../../shared/validators/date-sequence.validator';
import { StatusBadgeDirective } from '../../../../shared/directives/status-badge.directive';

@Component({
  selector: 'app-application-wizard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, StatusBadgeDirective],
  templateUrl: './application-wizard.component.html',
  styleUrl: './application-wizard.component.scss'
})
export class ApplicationWizardComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  plans$ = this.store.select(selectActivePlans);
  farms$ = this.store.select(selectFarms);
  cropsMap$ = this.store.select(selectCropsByFarmId);
  applications$ = this.store.select(selectMyApplications);
  loading$ = this.store.select(selectFarmerLoading);

  showNewAppForm = false;

  appForm: FormGroup = this.fb.group({
    planId: [null, [Validators.required]],
    farmId: [null, [Validators.required]],
    cropId: [null, [Validators.required]],
    requestedCoverage: [200000, [Validators.required, Validators.min(1000)]],
    proposedStartDate: ['2026-10-01', [Validators.required]],
    proposedEndDate: ['2027-03-25', [Validators.required]]
  }, { validators: dateSequenceValidator('proposedStartDate', 'proposedEndDate') });

  ngOnInit(): void {
    this.store.dispatch(FarmerActions.loadActivePlans());
    this.store.dispatch(FarmerActions.loadFarms());
    this.store.dispatch(FarmerActions.loadApplications());

    this.route.queryParams.subscribe(params => {
      if (params['planId']) {
        this.appForm.patchValue({ planId: Number(params['planId']) });
        this.showNewAppForm = true;
      }
    });

    this.appForm.get('farmId')?.valueChanges.subscribe(farmId => {
      if (farmId) {
        this.store.dispatch(FarmerActions.loadCrops({ farmId }));
      }
    });
  }

  onSubmit(): void {
    if (this.appForm.valid) {
      this.store.dispatch(FarmerActions.createApplication({ application: this.appForm.value }));
      this.showNewAppForm = false;
    } else {
      this.appForm.markAllAsTouched();
    }
  }

  submitForReview(applicationId: number): void {
    this.store.dispatch(FarmerActions.submitApplication({ applicationId }));
  }
}