import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileFormComponent } from './profile-form.component';
import { provideMockStore } from '@ngrx/store/testing';
import { selectFarmerProfile, selectFarmerLoading } from '../../state/farmer.selectors';

describe('ProfileFormComponent', () => {
  let component: ProfileFormComponent;
  let fixture: ComponentFixture<ProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileFormComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectFarmerProfile, value: null },
            { selector: selectFarmerLoading, value: false }
          ]
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the profile form component', () => {
    expect(component).toBeTruthy();
  });
});