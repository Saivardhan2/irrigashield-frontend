import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CropManagerComponent } from './crop-manager.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectCropsByFarmId, selectFarmerLoading } from '../../state/farmer.selectors';
import { FarmerActions } from '../../state/farmer.actions';
import { vi } from 'vitest';

describe('CropManagerComponent', () => {
  let component: CropManagerComponent;
  let fixture: ComponentFixture<CropManagerComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropManagerComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectCropsByFarmId, value: { 1: [] } },
            { selector: selectFarmerLoading, value: false }
          ]
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  it('should create the crop manager component', () => {
    fixture = TestBed.createComponent(CropManagerComponent);
    component = fixture.componentInstance;
    component.farmId = 1;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should toggle add crop form', () => {
    fixture = TestBed.createComponent(CropManagerComponent);
    component = fixture.componentInstance;
    component.farmId = 1;
    component.showAddForm = true;
    fixture.detectChanges();

    const formEl = fixture.nativeElement.querySelector('form');
    expect(formEl).toBeTruthy();
  });

  it('should dispatch addCrop on valid form submit', () => {
    fixture = TestBed.createComponent(CropManagerComponent);
    component = fixture.componentInstance;
    component.farmId = 1;
    component.showAddForm = true;
    fixture.detectChanges();

    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.cropForm.setValue({
      cropType: 'Sugarcane',
      variety: 'Co 86032',
      sowingDate: '2026-08-01',
      expectedHarvestDate: '2027-05-30',
      growthStage: 'VEGETATIVE',
      irrigationRequirement: 'HIGH'
    });

    component.onSubmit();
    expect(dispatchSpy).toHaveBeenCalledWith(
      FarmerActions.addCrop({
        farmId: 1,
        crop: {
          cropType: 'Sugarcane',
          variety: 'Co 86032',
          sowingDate: '2026-08-01',
          expectedHarvestDate: '2027-05-30',
          growthStage: 'VEGETATIVE',
          irrigationRequirement: 'HIGH'
        }
      })
    );
  });
});
