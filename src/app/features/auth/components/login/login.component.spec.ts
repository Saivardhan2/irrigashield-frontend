import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { AuthActions } from '../../state/auth.actions';
import { selectAuthLoading, selectAuthError } from '../../state/auth.selectors';
import { vi } from 'vitest';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form initially', () => {
    expect(component.loginForm.valid).toBe(false);
  });

  it('should dispatch login action on valid submit', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.loginForm.setValue({
      email: 'ramesh@example.com',
      password: 'Password123'
    });

    component.onSubmit();
    expect(dispatchSpy).toHaveBeenCalledWith(
      AuthActions.login({
        credentials: {
          email: 'ramesh@example.com',
          password: 'Password123'
        }
      })
    );
  });

  it('should patch form when fillDemo is called', () => {
    component.fillDemo('admin@irrigashield.com', 'Admin12345');
    expect(component.loginForm.value.email).toBe('admin@irrigashield.com');
    expect(component.loginForm.value.password).toBe('Admin12345');
  });
});

