import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../../../shared/services/notification.service';
import { AuthActions } from '../state/auth.actions';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const store = inject(Store);
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred';
      if (error.error && typeof error.error === 'object' && error.error.message) {
        errorMessage = error.error.message;
      } else if (typeof error.error === 'string') {
        errorMessage = error.error;
      }

      if (error.status === 401) {
        // Do not redirect if already on login/register page
        if (!req.url.includes('/auth/login') && !req.url.includes('/auth/register')) {
          notificationService.showError('Session expired or unauthorized. Please log in.');
          store.dispatch(AuthActions.sessionInactive());
          router.navigate(['/auth/login']);
        }
      } else if (error.status === 409) {
        notificationService.showWarning(errorMessage);
      } else if (error.status === 403) {
        notificationService.showError('Access denied. Insufficient permissions.');
      } else if (error.status >= 500) {
        notificationService.showError('Server error: ' + errorMessage);
      }

      return throwError(() => error);
    })
  );
};

