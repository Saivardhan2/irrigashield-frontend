import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { PayoutSlabBuilderComponent } from './payout-slab-builder.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('PayoutSlabBuilderComponent', () => {
  let component: PayoutSlabBuilderComponent;
  let fixture: ComponentFixture<PayoutSlabBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayoutSlabBuilderComponent, ReactiveFormsModule],
      providers: [
        provideRouter([]),
        provideMockStore({
          initialState: {
            admin: { slabs: [], loading: false }
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PayoutSlabBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create payout slab builder component', () => {
    expect(component).toBeTruthy();
  });
});