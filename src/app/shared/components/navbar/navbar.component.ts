import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser, selectIsAuthenticated, selectUserRole } from '../../../features/auth/state/auth.selectors';
import { AuthActions } from '../../../features/auth/state/auth.actions';
import { StatusBadgeDirective } from '../../directives/status-badge.directive';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, StatusBadgeDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private store = inject(Store);

  currentUser$ = this.store.select(selectCurrentUser);
  isAuthenticated$ = this.store.select(selectIsAuthenticated);
  userRole$ = this.store.select(selectUserRole);

  mobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}

