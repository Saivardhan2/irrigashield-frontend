import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationWizardComponent } from './application-wizard.component';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { 
  selectActivePlans, 
  selectFarms, 
  selectCropsByFarmId, 
  selectMyApplications, 
  selectFarmerLoading 
} from '../../state/farmer.selectors';

describe('ApplicationWizardComponent', () => {
  let component: ApplicationWizardComponent;
  let fixture: ComponentFixture<ApplicationWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationWizardComponent],
      providers: [
        provideRouter([]),
        provideMockStore({
          selectors: [
            { selector: selectActivePlans, value: [] },
            { selector: selectFarms, value: [] },
            { selector: selectCropsByFarmId, value: {} },
            { selector: selectMyApplications, value: [] },
            { selector: selectFarmerLoading, value: false }
          ]
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the application wizard component', () => {
    expect(component).toBeTruthy();
  });
});