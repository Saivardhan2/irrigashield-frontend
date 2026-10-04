import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ClaimsActions } from '../../state/claims.actions';
import { selectAllClaims, selectClaimsLoading, selectAlertClaim } from '../../state/claims.selectors';
import { StatusBadgeDirective } from '../../../../shared/directives/status-badge.directive';
import { ClaimAlertDialogComponent } from '../claim-alert-dialog/claim-alert-dialog.component';

@Component({
  selector: 'app-farmer-claims-history',
  standalone: true,
  imports: [CommonModule, StatusBadgeDirective, ClaimAlertDialogComponent],
  templateUrl: './farmer-claims-history.component.html',
  styleUrl: './farmer-claims-history.component.scss'
})
export class FarmerClaimsHistoryComponent implements OnInit {
  private store = inject(Store);

  claims$ = this.store.select(selectAllClaims);
  loading$ = this.store.select(selectClaimsLoading);
  alertClaim$ = this.store.select(selectAlertClaim);

  ngOnInit(): void {
    this.store.dispatch(ClaimsActions.loadMyClaims());
  }

  dismissAlert(): void {
    this.store.dispatch(ClaimsActions.clearClaimAlert());
  }
}