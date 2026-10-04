import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IrrigationFormComponent } from './irrigation-form.component';
import { provideMockStore } from '@ngrx/store/testing';
import { selectIrrigationByFarmId, selectFarmerLoading } from '../../state/farmer.selectors';

describe('IrrigationFormComponent', () => {
  let component: IrrigationFormComponent;
  let fixture: ComponentFixture<IrrigationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IrrigationFormComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectIrrigationByFarmId, value: { 1: null } },
            { selector: selectFarmerLoading, value: false }
          ]
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IrrigationFormComponent);
    component = fixture.componentInstance;
    component.farmId = 1;
    fixture.detectChanges();
  });

  it('should create the irrigation form component', () => {
    expect(component).toBeTruthy();
  });
});