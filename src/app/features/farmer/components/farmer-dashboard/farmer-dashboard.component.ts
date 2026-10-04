import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { FarmerActions } from '../../state/farmer.actions';
import { 
  selectFarms, 
  selectMyPolicies, 
  selectMyApplications, 
  selectFarmerProfile,
  selectFarmerLoading 
} from '../../state/farmer.selectors';
import { StatusBadgeDirective } from '../../../../shared/directives/status-badge.directive';

@Component({
  selector: 'app-farmer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusBadgeDirective],
  templateUrl: './farmer-dashboard.component.html',
  styleUrl: './farmer-dashboard.component.scss'
})
export class FarmerDashboardComponent implements OnInit {
  private store = inject(Store);

  farms$ = this.store.select(selectFarms);
  policies$ = this.store.select(selectMyPolicies);
  applications$ = this.store.select(selectMyApplications);
  profile$ = this.store.select(selectFarmerProfile);
  loading$ = this.store.select(selectFarmerLoading);

  ngOnInit(): void {
    this.store.dispatch(FarmerActions.loadProfile());
    this.store.dispatch(FarmerActions.loadFarms());
    this.store.dispatch(FarmerActions.loadApplications());
    this.store.dispatch(FarmerActions.loadMyPolicies());
  }
}