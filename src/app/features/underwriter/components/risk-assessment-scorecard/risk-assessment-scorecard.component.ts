import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UnderwritingActions } from '../../state/underwriting.actions';
import { selectActiveCase, selectUnderwritingLoading } from '../../state/underwriting.selectors';
import { DecisionModalComponent } from '../decision-modal/decision-modal.component';
import { StatusBadgeDirective } from '../../../../shared/directives/status-badge.directive';
import { RiskLevelGaugeDirective } from '../../../../shared/directives/risk-level-gauge.directive';

@Component({
  selector: 'app-risk-assessment-scorecard',
  standalone: true,
  imports: [
    CommonModule, 
    DecisionModalComponent, 
    RiskLevelGaugeDirective
  ],
  templateUrl: './risk-assessment-scorecard.component.html',
  styleUrl: './risk-assessment-scorecard.component.scss'
})
export class RiskAssessmentScorecardComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);

  activeCase$ = this.store.select(selectActiveCase);
  loading$ = this.store.select(selectUnderwritingLoading);

  applicationId!: number;
  showModal = false;
  modalType: 'APPROVE' | 'REJECT' = 'APPROVE';

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('appId');
    if (idParam) {
      this.applicationId = Number(idParam);
      // Automatically trigger initial risk assessment if not yet assessed
      this.store.dispatch(UnderwritingActions.assessRisk({ applicationId: this.applicationId }));
    }
  }

  runAssessment(): void {
    if (this.applicationId) {
      this.store.dispatch(UnderwritingActions.assessRisk({ applicationId: this.applicationId }));
    }
  }

  openDecision(type: 'APPROVE' | 'REJECT'): void {
    this.modalType = type;
    this.showModal = true;
  }

  onDecisionConfirmed(remarks: string): void {
    if (this.modalType === 'APPROVE') {
      this.store.dispatch(UnderwritingActions.approveApplication({ 
        applicationId: this.applicationId, 
        decision: { remarks } 
      }));
    } else {
      this.store.dispatch(UnderwritingActions.rejectApplication({ 
        applicationId: this.applicationId, 
        decision: { remarks } 
      }));
    }
    this.showModal = false;
    this.router.navigate(['/underwriter/queue']);
  }
}