import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { authGuard } from './auth.guard';
import { selectIsAuthenticated } from '../state/auth.selectors';
import { firstValueFrom, Observable } from 'rxjs';

describe('authGuard', () => {
  let store: MockStore;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectIsAuthenticated, value: true }
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

  it('should allow access when authenticated', async () => {
    const result$ = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any)) as Observable<boolean | UrlTree>;
    const res = await firstValueFrom(result$);
    expect(res).toBe(true);
  });

  it('should redirect to /auth/login when unauthenticated', async () => {
    store.overrideSelector(selectIsAuthenticated, false);
    store.refreshState();

    const result$ = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any)) as Observable<boolean | UrlTree>;
    const res = await firstValueFrom(result$);
    expect((res as UrlTree).toString()).toBe('/auth/login');
  });
});

