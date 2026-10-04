import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { AuthActions } from '../../state/auth.actions';
import { selectAuthLoading, selectAuthError } from '../../state/auth.selectors';
import { vi } from 'vitest';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        provideRouter([]),
        provideMockStore({
          selectors: [
            { selector: selectAuthLoading, value: false },
            { selector: selectAuthError, value: null }
          ]
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the register component', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate form when passwords mismatch', () => {
    component.registerForm.patchValue({
      name: 'Ramesh Kumar',
      email: 'ramesh@example.com',
      password: 'Password123',
      confirmPassword: 'MismatchPassword123'
    });

    expect(component.registerForm.valid).toBe(false);
    expect(component.registerForm.get('confirmPassword')?.hasError('passwordMismatch')).toBe(true);
  });

  it('should dispatch register action on valid form submission', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.registerForm.setValue({
      name: 'Ramesh Kumar',
      email: 'ramesh@example.com',
      password: 'Password123',
      confirmPassword: 'Password123'
    });

    component.onSubmit();

    expect(dispatchSpy).toHaveBeenCalledWith(
      AuthActions.register({
        request: {
          name: 'Ramesh Kumar',
          email: 'ramesh@example.com',
          password: 'Password123'
        }
      })
    );
  });
});

