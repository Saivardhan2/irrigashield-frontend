import { Component, Input, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { FarmerActions } from '../../state/farmer.actions';
import { selectApprovedQuote, selectFarmerLoading } from '../../state/farmer.selectors';
import { StatusBadgeDirective } from '../../../../shared/directives/status-badge.directive';

@Component({
  selector: 'app-quote-acceptance',
  standalone: true,
  imports: [CommonModule, StatusBadgeDirective],
  templateUrl: './quote-acceptance.component.html',
  styleUrl: './quote-acceptance.component.scss'
})
export class QuoteAcceptanceComponent implements OnInit, OnChanges {
  @Input({ required: true }) applicationId!: number;

  private store = inject(Store);

  quote$ = this.store.select(selectApprovedQuote);
  loading$ = this.store.select(selectFarmerLoading);

  ngOnInit(): void {
    if (this.applicationId) {
      this.store.dispatch(FarmerActions.loadApprovedQuote({ applicationId: this.applicationId }));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['applicationId'] && this.applicationId) {
      this.store.dispatch(FarmerActions.loadApprovedQuote({ applicationId: this.applicationId }));
    }
  }

  acceptQuote(): void {
    if (this.applicationId) {
      this.store.dispatch(FarmerActions.acceptQuote({ applicationId: this.applicationId }));
    }
  }
}