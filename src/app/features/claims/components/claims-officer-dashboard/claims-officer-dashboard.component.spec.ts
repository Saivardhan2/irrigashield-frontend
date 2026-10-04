import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ClaimsOfficerDashboardComponent } from './claims-officer-dashboard.component';
import { ClaimsApiService } from '../../services/claims-api.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { of } from 'rxjs';

describe('ClaimsOfficerDashboardComponent', () => {
  let component: ClaimsOfficerDashboardComponent;
  let fixture: ComponentFixture<ClaimsOfficerDashboardComponent>;
  let claimsApiMock: any;
  let notificationMock: any;

  beforeEach(async () => {
    claimsApiMock = {
      getAllClaims: vi.fn().mockReturnValue(of([
        {
          claimId: 1,
          policyId: 10,
          payoutPercentage: 25,
          compensationAmount: 15000,
          claimStatus: 'PENDING',
          triggerReason: 'Deficit detected'
        },
        {
          claimId: 2,
          policyId: 11,
          payoutPercentage: 50,
          compensationAmount: 30000,
          claimStatus: 'SETTLED',
          triggerReason: 'Severe drought'
        }
      ])),
      getMyClaims: vi.fn().mockReturnValue(of([])),
      settleClaim: vi.fn().mockReturnValue(of({
        claimId: 1,
        policyId: 10,
        compensationAmount: 15000,
        claimStatus: 'SETTLED',
        payoutStatus: 'SUCCESS'
      }))
    };

    notificationMock = {
      showSuccess: vi.fn(),
      showError: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ClaimsOfficerDashboardComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ClaimsApiService, useValue: claimsApiMock },
        { provide: NotificationService, useValue: notificationMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClaimsOfficerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create claims officer dashboard component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate metrics properly', () => {
    expect(component.totalClaimsCount).toBe(2);
    expect(component.pendingClaimsCount).toBe(1);
    expect(component.settledClaimsCount).toBe(1);
    expect(component.totalDisbursedAmount).toBe(30000);
  });

  it('should filter claims by tab', () => {
    component.activeFilter = 'PENDING';
    expect(component.filteredClaims.length).toBe(1);
    expect(component.filteredClaims[0].claimId).toBe(1);

    component.activeFilter = 'SETTLED';
    expect(component.filteredClaims.length).toBe(1);
    expect(component.filteredClaims[0].claimId).toBe(2);
  });

  it('should settle a pending claim on button action', () => {
    const pendingClaim = component.claims[0];
    component.settleClaim(pendingClaim);
    expect(claimsApiMock.settleClaim).toHaveBeenCalledWith(1);
    expect(notificationMock.showSuccess).toHaveBeenCalled();
    expect(component.claims[0].claimStatus).toBe('SETTLED');
  });
});

