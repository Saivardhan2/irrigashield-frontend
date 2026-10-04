import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { FarmerActions } from '../../state/farmer.actions';
import { selectMyPolicies, selectMyApplications, selectFarmerLoading } from '../../state/farmer.selectors';
import { QuoteAcceptanceComponent } from '../quote-acceptance/quote-acceptance.component';
import { StatusBadgeDirective } from '../../../../shared/directives/status-badge.directive';

@Component({
  selector: 'app-my-policies',
  standalone: true,
  imports: [CommonModule, RouterLink, QuoteAcceptanceComponent, StatusBadgeDirective],
  templateUrl: './my-policies.component.html',
  styleUrl: './my-policies.component.scss'
})
export class MyPoliciesComponent implements OnInit {
  private store = inject(Store);

  policies$ = this.store.select(selectMyPolicies);
  applications$ = this.store.select(selectMyApplications);
  loading$ = this.store.select(selectFarmerLoading);

  ngOnInit(): void {
    this.store.dispatch(FarmerActions.loadMyPolicies());
    this.store.dispatch(FarmerActions.loadApplications());
  }
}