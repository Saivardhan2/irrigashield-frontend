import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../state/auth.selectors';
import { map, take } from 'rxjs';

export const roleGuard: CanActivateFn = (route) => {
  const store = inject(Store);
  const router = inject(Router);
  const allowedRoles: string[] = route.data['roles'] || [];

  return store.select(selectCurrentUser).pipe(
    take(1),
    map(user => {
      if (user && allowedRoles.includes(user.role)) {
        return true;
      }
      return router.createUrlTree(['/auth/login']);
    })
  );
};

