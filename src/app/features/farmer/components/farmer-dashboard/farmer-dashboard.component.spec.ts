import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FarmerDashboardComponent } from './farmer-dashboard.component';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { 
  selectFarms, 
  selectMyPolicies, 
  selectMyApplications, 
  selectFarmerProfile,
  selectFarmerLoading 
} from '../../state/farmer.selectors';

describe('FarmerDashboardComponent', () => {
  let component: FarmerDashboardComponent;
  let fixture: ComponentFixture<FarmerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerDashboardComponent],
      providers: [
        provideRouter([]),
        provideMockStore({
          selectors: [
            { selector: selectFarms, value: [] },
            { selector: selectMyPolicies, value: [] },
            { selector: selectMyApplications, value: [] },
            { selector: selectFarmerProfile, value: null },
            { selector: selectFarmerLoading, value: false }
          ]
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FarmerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the farmer dashboard component', () => {
    expect(component).toBeTruthy();
  });
});