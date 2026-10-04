import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AdminActions } from '../../state/admin.actions';
import { selectAdminRules, selectAdminLoading } from '../../state/admin.selectors';
import { StatusBadgeDirective } from '../../../../shared/directives/status-badge.directive';
import { TriggerRuleRequest } from '../../model/admin.models';

@Component({
  selector: 'app-trigger-rule-builder',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, StatusBadgeDirective],
  templateUrl: './trigger-rule-builder.component.html',
  styleUrl: './trigger-rule-builder.component.scss'
})
export class TriggerRuleBuilderComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private store = inject(Store);

  planId = 1;
  ruleForm!: FormGroup;
  rules$ = this.store.select(selectAdminRules);
  loading$ = this.store.select(selectAdminLoading);

  cropTypes = ['Sugarcane', 'Cotton', 'Wheat', 'Rice', 'Maize', 'Soybean', 'Groundnut'];
  stages = ['SOWING', 'VEGETATIVE', 'FLOWERING', 'MATURITY', 'HARVEST'];

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('planId');
    if (param) this.planId = Number(param);

    this.ruleForm = this.fb.group({
      cropType: ['Sugarcane', Validators.required],
      growthStage: ['VEGETATIVE', Validators.required],
      availabilityThresholdPercentage: [70.0, [Validators.required, Validators.min(1), Validators.max(100)]],
      minimumContinuousHours: [48, [Validators.required, Validators.min(1)]],
      rollingWindowDays: [7, [Validators.required, Validators.min(1)]],
      requiredShortageDays: [3, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.ruleForm.invalid) return;
    const req: TriggerRuleRequest = this.ruleForm.value;
    this.store.dispatch(AdminActions.createTriggerRule({ planId: this.planId, request: req }));
  }
}