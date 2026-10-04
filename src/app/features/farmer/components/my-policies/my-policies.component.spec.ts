import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyPoliciesComponent } from './my-policies.component';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { selectMyPolicies, selectMyApplications, selectFarmerLoading } from '../../state/farmer.selectors';

describe('MyPoliciesComponent', () => {
  let component: MyPoliciesComponent;
  let fixture: ComponentFixture<MyPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPoliciesComponent],
      providers: [
        provideRouter([]),
        provideMockStore({
          selectors: [
            { selector: selectMyPolicies, value: [] },
            { selector: selectMyApplications, value: [] },
            { selector: selectFarmerLoading, value: false }
          ]
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MyPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the my policies component', () => {
    expect(component).toBeTruthy();
  });
});