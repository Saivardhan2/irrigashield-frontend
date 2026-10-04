import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { TriggerRuleBuilderComponent } from './trigger-rule-builder.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('TriggerRuleBuilderComponent', () => {
  let component: TriggerRuleBuilderComponent;
  let fixture: ComponentFixture<TriggerRuleBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriggerRuleBuilderComponent, ReactiveFormsModule],
      providers: [
        provideRouter([]),
        provideMockStore({
          initialState: {
            admin: { rules: [], loading: false }
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TriggerRuleBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create trigger rule builder component', () => {
    expect(component).toBeTruthy();
  });
});