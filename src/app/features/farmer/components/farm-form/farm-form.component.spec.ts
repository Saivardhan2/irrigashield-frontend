import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FarmFormComponent } from './farm-form.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectFarmerLoading } from '../../state/farmer.selectors';

describe('FarmFormComponent', () => {
  let component: FarmFormComponent;
  let fixture: ComponentFixture<FarmFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmFormComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectFarmerLoading, value: false }
          ]
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FarmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the farm form component', () => {
    expect(component).toBeTruthy();
  });
});