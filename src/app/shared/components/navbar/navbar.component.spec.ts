import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { vi } from 'vitest';
import { NavbarComponent } from './navbar.component';
import { selectCurrentUser, selectIsAuthenticated, selectUserRole } from '../../../features/auth/state/auth.selectors';
import { AuthActions } from '../../../features/auth/state/auth.actions';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let store: MockStore;

  const mockUser = {
    userId: 1,
    name: 'Ramesh Kumar',
    email: 'ramesh@example.com',
    role: 'FARMER' as const,
    status: 'ACTIVE' as const
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        provideRouter([]),
        provideMockStore({
          selectors: [
            { selector: selectCurrentUser, value: mockUser },
            { selector: selectIsAuthenticated, value: true },
            { selector: selectUserRole, value: 'FARMER' }
          ]
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the navbar component', () => {
    expect(component).toBeTruthy();
  });

  it('should show user name and role when authenticated', () => {
    const userNameEl = fixture.nativeElement.querySelector('.user-name');
    expect(userNameEl.textContent).toContain('Ramesh Kumar');
  });

  it('should dispatch logout action on sign out button click', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const signOutBtn = fixture.nativeElement.querySelector('.btn-secondary');
    signOutBtn.click();
    expect(dispatchSpy).toHaveBeenCalledWith(AuthActions.logout());
  });
});

