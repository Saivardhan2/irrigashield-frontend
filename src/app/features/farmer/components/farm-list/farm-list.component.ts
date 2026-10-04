import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { FarmerActions } from '../../state/farmer.actions';
import { 
  selectFarms, 
  selectSelectedFarmId, 
  selectSelectedFarm, 
  selectFarmerLoading 
} from '../../state/farmer.selectors';
import { FarmFormComponent } from '../farm-form/farm-form.component';
import { CropManagerComponent } from '../crop-manager/crop-manager.component';
import { IrrigationFormComponent } from '../irrigation-form/irrigation-form.component';
import { StatusBadgeDirective } from '../../../../shared/directives/status-badge.directive';

@Component({
  selector: 'app-farm-list',
  standalone: true,
  imports: [
    CommonModule, 
    FarmFormComponent, 
    CropManagerComponent, 
    IrrigationFormComponent, 
    StatusBadgeDirective
  ],
  templateUrl: './farm-list.component.html',
  styleUrl: './farm-list.component.scss'
})
export class FarmListComponent implements OnInit {
  private store = inject(Store);

  farms$ = this.store.select(selectFarms);
  selectedFarmId$ = this.store.select(selectSelectedFarmId);
  selectedFarm$ = this.store.select(selectSelectedFarm);
  loading$ = this.store.select(selectFarmerLoading);

  showCreateFarm = false;

  ngOnInit(): void {
    this.store.dispatch(FarmerActions.loadFarms());
  }

  selectFarm(farmId: number): void {
    this.store.dispatch(FarmerActions.selectFarm({ farmId }));
  }
}