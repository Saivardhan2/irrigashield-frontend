import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuoteAcceptanceComponent } from './quote-acceptance.component';
import { provideMockStore } from '@ngrx/store/testing';
import { selectApprovedQuote, selectFarmerLoading } from '../../state/farmer.selectors';

describe('QuoteAcceptanceComponent', () => {
  let component: QuoteAcceptanceComponent;
  let fixture: ComponentFixture<QuoteAcceptanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteAcceptanceComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectApprovedQuote, value: null },
            { selector: selectFarmerLoading, value: false }
          ]
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteAcceptanceComponent);
    component = fixture.componentInstance;
    component.applicationId = 1;
    fixture.detectChanges();
  });

  it('should create the quote acceptance component', () => {
    expect(component).toBeTruthy();
  });
});