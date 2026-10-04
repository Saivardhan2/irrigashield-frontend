import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RiskAssessmentScorecardComponent } from './risk-assessment-scorecard.component';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { selectActiveCase, selectUnderwritingLoading } from '../../state/underwriting.selectors';

describe('RiskAssessmentScorecardComponent', () => {
  let component: RiskAssessmentScorecardComponent;
  let fixture: ComponentFixture<RiskAssessmentScorecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiskAssessmentScorecardComponent],
      providers: [
        provideRouter([]),
        provideMockStore({
          selectors: [
            { selector: selectActiveCase, value: null },
            { selector: selectUnderwritingLoading, value: false }
          ]
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RiskAssessmentScorecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the risk assessment scorecard component', () => {
    expect(component).toBeTruthy();
  });
});