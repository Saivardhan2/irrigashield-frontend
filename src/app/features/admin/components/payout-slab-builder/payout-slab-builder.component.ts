import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AdminActions } from '../../state/admin.actions';
import { selectAdminSlabs, selectAdminLoading } from '../../state/admin.selectors';
import { StatusBadgeDirective } from '../../../../shared/directives/status-badge.directive';
import { PayoutSlabRequest } from '../../model/admin.models';

@Component({
  selector: 'app-payout-slab-builder',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, StatusBadgeDirective],
  templateUrl: './payout-slab-builder.component.html',
  styleUrl: './payout-slab-builder.component.scss'
})
export class PayoutSlabBuilderComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private store = inject(Store);

  triggerRuleId = 1;
  slabForm!: FormGroup;
  slabs$ = this.store.select(selectAdminSlabs);
  loading$ = this.store.select(selectAdminLoading);

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('ruleId');
    if (param) this.triggerRuleId = Number(param);

    this.slabForm = this.fb.group({
      minimumDurationHours: [48, [Validators.required, Validators.min(1)]],
      maximumDurationHours: [72, [Validators.required, Validators.min(1)]],
      payoutPercentage: [25.0, [Validators.required, Validators.min(1), Validators.max(100)]]
    });
  }

  onSubmit(): void {
    if (this.slabForm.invalid) return;
    const req: PayoutSlabRequest = this.slabForm.value;
    this.store.dispatch(AdminActions.createPayoutSlab({ triggerRuleId: this.triggerRuleId, request: req }));
  }
}