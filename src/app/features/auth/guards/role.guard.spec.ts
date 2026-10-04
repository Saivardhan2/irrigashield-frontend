import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { roleGuard } from './role.guard';
import { selectCurrentUser } from '../state/auth.selectors';
import { firstValueFrom, Observable } from 'rxjs';

describe('roleGuard', () => {
  let store: MockStore;
  let router: Router;

  const mockUser = {
    userId: 1,
    name: 'Ramesh',
    email: 'ramesh@example.com',
    role: 'FARMER' as const,
    status: 'ACTIVE' as const
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectCurrentUser, value: mockUser }
          ]
        }),
        {
          provide: Router,
          useValue: {
            createUrlTree: (commands: any[]) => ({ toString: () => commands.join('/') } as UrlTree)
          }
        }
      ]
    });

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
  });

  it('should allow access if user has required role', async () => {
    const routeSnapshot = { data: { roles: ['FARMER', 'ADMIN'] } } as unknown as ActivatedRouteSnapshot;
    const result$ = TestBed.runInInjectionContext(() => roleGuard(routeSnapshot, {} as any)) as Observable<boolean | UrlTree>;
    const res = await firstValueFrom(result$);
    expect(res).toBe(true);
  });

  it('should redirect if user does not have required role', async () => {
    const routeSnapshot = { data: { roles: ['ADMIN'] } } as unknown as ActivatedRouteSnapshot;
    const result$ = TestBed.runInInjectionContext(() => roleGuard(routeSnapshot, {} as any)) as Observable<boolean | UrlTree>;
    const res = await firstValueFrom(result$);
    expect((res as UrlTree).toString()).toBe('/auth/login');
  });
});

