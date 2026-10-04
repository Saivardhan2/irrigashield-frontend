import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AdminActions } from '../../state/admin.actions';
import { selectAdminPlans, selectAdminLoading } from '../../state/admin.selectors';
import { StatusBadgeDirective } from '../../../../shared/directives/status-badge.directive';
import { CreatePlanRequest } from '../../model/admin.models';

@Component({
  selector: 'app-plan-builder',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, StatusBadgeDirective],
  templateUrl: './plan-builder.component.html',
  styleUrl: './plan-builder.component.scss'
})
export class PlanBuilderComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  planForm!: FormGroup;
  plans$ = this.store.select(selectAdminPlans);
  loading$ = this.store.select(selectAdminLoading);
  showForm = false;

  ngOnInit(): void {
    this.store.dispatch(AdminActions.loadPlans());

    this.planForm = this.fb.group({
      planName: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      minimumCoverage: [50000, [Validators.required, Validators.min(1000)]],
      maximumCoverage: [500000, [Validators.required, Validators.min(5000)]],
      basePremium: [3000, [Validators.required, Validators.min(100)]],
      maximumPolicyDays: [180, [Validators.required, Validators.min(30), Validators.max(365)]]
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  onSubmit(): void {
    if (this.planForm.invalid) return;
    const req: CreatePlanRequest = this.planForm.value;
    this.store.dispatch(AdminActions.createPlan({ request: req }));
    this.planForm.reset({
      minimumCoverage: 50000,
      maximumCoverage: 500000,
      basePremium: 3000,
      maximumPolicyDays: 180
    });
    this.showForm = false;
  }
}