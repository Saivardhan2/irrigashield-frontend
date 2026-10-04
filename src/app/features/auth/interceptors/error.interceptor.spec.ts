import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { errorInterceptor } from './error.interceptor';
import { NotificationService } from '../../../shared/services/notification.service';
import { vi } from 'vitest';

describe('errorInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let notificationService: NotificationService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
        provideMockStore(),
        NotificationService,
        {
          provide: Router,
          useValue: { navigate: vi.fn() }
        }
      ]
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    notificationService = TestBed.inject(NotificationService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should show error notification and redirect on 401 for authenticated endpoints', () => {
    const errorSpy = vi.spyOn(notificationService, 'showError');

    http.get('/api/farms/my-farms').subscribe({
      error: () => {}
    });

    const req = httpMock.expectOne('/api/farms/my-farms');
    req.flush({ message: 'Unauthorized' }, { status: 401, statusText: 'Unauthorized' });

    expect(errorSpy).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('should show warning notification on 409 conflict', () => {
    const warnSpy = vi.spyOn(notificationService, 'showWarning');

    http.post('/api/applications/1/submit', {}).subscribe({
      error: () => {}
    });

    const req = httpMock.expectOne('/api/applications/1/submit');
    req.flush({ message: 'Farm profile incomplete' }, { status: 409, statusText: 'Conflict' });

    expect(warnSpy).toHaveBeenCalledWith('Farm profile incomplete');
  });
});

