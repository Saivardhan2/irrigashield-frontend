import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AuthActions } from './auth.actions';
import { AuthApiService } from '../services/auth-api.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authApi = inject(AuthApiService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ credentials }) =>
        this.authApi.login(credentials).pipe(
          map(response => AuthActions.loginSuccess({ user: response.user })),
          catchError(err => {
            const msg = err.error?.message || 'Authentication failed. Please verify credentials.';
            this.notificationService.showError(msg);
            return of(AuthActions.loginFailure({ error: msg }));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ user }) => {
          this.notificationService.showSuccess(`Welcome back, ${user.name}!`);
          switch (user.role) {
            case 'FARMER':
              this.router.navigate(['/farmer/dashboard']);
              break;
            case 'UNDERWRITER':
              this.router.navigate(['/underwriter/queue']);
              break;
            case 'DATA_PROVIDER':
              this.router.navigate(['/claims/simulator']);
              break;
            case 'ADMIN':
              this.router.navigate(['/admin/users']);
              break;
            default:
              this.router.navigate(['/auth/login']);
          }
        })
      ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap(({ request }) =>
        this.authApi.register(request).pipe(
          map(user => {
            this.notificationService.showSuccess('Registration successful! Please log in to continue.');
            this.router.navigate(['/auth/login']);
            return AuthActions.registerSuccess({ user });
          }),
          catchError(err => {
            const msg = err.error?.message || 'Registration failed. Please check the form data.';
            this.notificationService.showError(msg);
            return of(AuthActions.registerFailure({ error: msg }));
          })
        )
      )
    )
  );

  checkSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkSession),
      exhaustMap(() =>
        this.authApi.getCurrentUser().pipe(
          map(user => AuthActions.sessionActive({ user })),
          catchError(() => of(AuthActions.sessionInactive()))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      exhaustMap(() =>
        this.authApi.logout().pipe(
          map(() => {
            this.notificationService.showInfo('You have logged out.');
            this.router.navigate(['/auth/login']);
            return AuthActions.logoutSuccess();
          }),
          catchError(() => {
            this.router.navigate(['/auth/login']);
            return of(AuthActions.logoutSuccess());
          })
        )
      )
    )
  );
}

