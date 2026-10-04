import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UnderwritingActions } from '../../state/underwriting.actions';
import { selectPendingQueue, selectUnderwritingLoading } from '../../state/underwriting.selectors';
import { UnderwritingResponse } from '../../model/underwriting.models';
import { StatusBadgeDirective } from '../../../../shared/directives/status-badge.directive';

@Component({
  selector: 'app-pending-queue',
  standalone: true,
  imports: [CommonModule, StatusBadgeDirective],
  templateUrl: './pending-queue.component.html',
  styleUrl: './pending-queue.component.scss'
})
export class PendingQueueComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);

  queue$ = this.store.select(selectPendingQueue);
  loading$ = this.store.select(selectUnderwritingLoading);

  ngOnInit(): void {
    this.store.dispatch(UnderwritingActions.loadPendingQueue());
  }

  startReview(item: UnderwritingResponse): void {
    this.store.dispatch(UnderwritingActions.startReview({ applicationId: item.applicationId }));
    this.store.dispatch(UnderwritingActions.selectActiveCase({ underCase: item }));
    this.router.navigate(['/underwriter/assessment', item.applicationId]);
  }
}