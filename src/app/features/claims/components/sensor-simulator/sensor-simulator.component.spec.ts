import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { SensorSimulatorComponent } from './sensor-simulator.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('SensorSimulatorComponent', () => {
  let component: SensorSimulatorComponent;
  let fixture: ComponentFixture<SensorSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorSimulatorComponent, ReactiveFormsModule],
      providers: [
        provideMockStore({
          initialState: {
            claims: { lastReading: null, loading: false }
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SensorSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create sensor simulator component', () => {
    expect(component).toBeTruthy();
    expect(component.sensorForm.valid).toBe(true);
  });

  it('should update values when preset is selected', () => {
    component.setPreset('DROUGHT');
    expect(component.sensorForm.value.waterDeficitPercentage).toBe(75);
    expect(component.sensorForm.value.continuousDeficitHours).toBe(52);
  });
});