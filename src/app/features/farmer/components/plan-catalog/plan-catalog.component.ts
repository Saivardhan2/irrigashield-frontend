import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FarmerActions } from '../../state/farmer.actions';
import { selectActivePlans, selectFarmerLoading } from '../../state/farmer.selectors';
import { InsurancePlanResponse } from '../../model/application.models';

@Component({
  selector: 'app-plan-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan-catalog.component.html',
  styleUrl: './plan-catalog.component.scss'
})
export class PlanCatalogComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);

  plans$ = this.store.select(selectActivePlans);
  loading$ = this.store.select(selectFarmerLoading);

  ngOnInit(): void {
    this.store.dispatch(FarmerActions.loadActivePlans());
  }

  applyPlan(plan: InsurancePlanResponse): void {
    this.router.navigate(['/farmer/applications'], { queryParams: { planId: plan.planId } });
  }
}
