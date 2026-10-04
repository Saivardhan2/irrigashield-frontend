import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { UnderwritingActions } from '../../state/underwriting.actions';
import { selectMyCases, selectUnderwritingLoading } from '../../state/underwriting.selectors';
import { StatusBadgeDirective } from '../../../../shared/directives/status-badge.directive';

@Component({
  selector: 'app-case-history',
  standalone: true,
  imports: [CommonModule, StatusBadgeDirective],
  templateUrl: './case-history.component.html',
  styleUrl: './case-history.component.scss'
})
export class CaseHistoryComponent implements OnInit {
  private store = inject(Store);

  cases$ = this.store.select(selectMyCases);
  loading$ = this.store.select(selectUnderwritingLoading);

  ngOnInit(): void {
    this.store.dispatch(UnderwritingActions.loadMyCases());
  }
}