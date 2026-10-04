import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DecisionModalComponent } from './decision-modal.component';

describe('DecisionModalComponent', () => {
  let component: DecisionModalComponent;
  let fixture: ComponentFixture<DecisionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecisionModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DecisionModalComponent);
    component = fixture.componentInstance;
    component.applicationId = 1;
    component.decisionType = 'APPROVE';
    fixture.detectChanges();
  });

  it('should create the decision modal component', () => {
    expect(component).toBeTruthy();
  });
});