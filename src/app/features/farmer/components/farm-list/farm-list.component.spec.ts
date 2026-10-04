import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FarmListComponent } from './farm-list.component';
import { provideMockStore } from '@ngrx/store/testing';
import { 
  selectFarms, 
  selectSelectedFarmId, 
  selectSelectedFarm, 
  selectCropsByFarmId,
  selectIrrigationByFarmId,
  selectFarmerLoading 
} from '../../state/farmer.selectors';

describe('FarmListComponent', () => {
  let component: FarmListComponent;
  let fixture: ComponentFixture<FarmListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmListComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectFarms, value: [] },
            { selector: selectSelectedFarmId, value: null },
            { selector: selectSelectedFarm, value: null },
            { selector: selectCropsByFarmId, value: {} },
            { selector: selectIrrigationByFarmId, value: {} },
            { selector: selectFarmerLoading, value: false }
          ]
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FarmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the farm list component', () => {
    expect(component).toBeTruthy();
  });
});