import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { FarmerClaimsHistoryComponent } from './farmer-claims-history.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('FarmerClaimsHistoryComponent', () => {
  let component: FarmerClaimsHistoryComponent;
  let fixture: ComponentFixture<FarmerClaimsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerClaimsHistoryComponent],
      providers: [
        provideMockStore({
          initialState: {
            claims: { claims: [], loading: false, alertClaim: null }
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FarmerClaimsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create farmer claims history component', () => {
    expect(component).toBeTruthy();
  });
});