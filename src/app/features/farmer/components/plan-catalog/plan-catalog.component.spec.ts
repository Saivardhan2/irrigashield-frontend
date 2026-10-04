import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { PlanCatalogComponent } from './plan-catalog.component';
import { selectActivePlans, selectFarmerLoading } from '../../state/farmer.selectors';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('PlanCatalogComponent', () => {
  let component: PlanCatalogComponent;
  let fixture: ComponentFixture<PlanCatalogComponent>;
  let router: Router;

  const mockPlans = [
    {
      planId: 1,
      planName: 'Sugarcane Drought Shield',
      description: 'Parametric water deficit insurance',
      minimumCoverage: 50000,
      maximumCoverage: 500000,
      basePremium: 3000,
      maximumPolicyDays: 180,
      status: 'ACTIVE'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanCatalogComponent],
      providers: [
        provideRouter([]),
        provideMockStore({
          selectors: [
            { selector: selectActivePlans, value: mockPlans },
            { selector: selectFarmerLoading, value: false }
          ]
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanCatalogComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
    fixture.detectChanges();
  });

  it('should create plan catalog component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to application wizard on applyPlan', () => {
    component.applyPlan(mockPlans[0] as any);
    expect(router.navigate).toHaveBeenCalledWith(
      ['/farmer/applications'],
      { queryParams: { planId: 1 } }
    );
  });
});