import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseHistoryComponent } from './case-history.component';
import { provideMockStore } from '@ngrx/store/testing';
import { selectMyCases, selectUnderwritingLoading } from '../../state/underwriting.selectors';

describe('CaseHistoryComponent', () => {
  let component: CaseHistoryComponent;
  let fixture: ComponentFixture<CaseHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseHistoryComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectMyCases, value: [] },
            { selector: selectUnderwritingLoading, value: false }
          ]
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CaseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the case history component', () => {
    expect(component).toBeTruthy();
  });
});