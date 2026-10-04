import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { PlanBuilderComponent } from './plan-builder.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('PlanBuilderComponent', () => {
  let component: PlanBuilderComponent;
  let fixture: ComponentFixture<PlanBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanBuilderComponent, ReactiveFormsModule],
      providers: [
        provideRouter([]),
        provideMockStore({
          initialState: {
            admin: { plans: [], loading: false }
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create plan builder component', () => {
    expect(component).toBeTruthy();
  });
});