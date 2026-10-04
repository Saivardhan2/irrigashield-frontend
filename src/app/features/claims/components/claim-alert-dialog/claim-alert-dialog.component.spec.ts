import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClaimAlertDialogComponent } from './claim-alert-dialog.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('ClaimAlertDialogComponent', () => {
  let component: ClaimAlertDialogComponent;
  let fixture: ComponentFixture<ClaimAlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaimAlertDialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ClaimAlertDialogComponent);
    component = fixture.componentInstance;
    component.claim = {
      claimId: 1,
      policyId: 1,
      triggerEvent: 'WATER_DEFICIT',
      payoutPercentage: 25,
      payoutAmount: 37500,
      status: 'APPROVED'
    };
    fixture.detectChanges();
  });

  it('should create claim alert dialog', () => {
    expect(component).toBeTruthy();
  });
});