import { TestBed } from '@angular/core/testing';
import { NotificationService, AppNotification } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add success notification', () => {
    service.showSuccess('Success message');
    let emitted: AppNotification[] = [];
    service.notifications$.subscribe(n => { emitted = n; });

    expect(emitted.length).toBe(1);
    expect(emitted[0].type).toBe('success');
    expect(emitted[0].message).toBe('Success message');
  });

  it('should dismiss notification by id', () => {
    service.showError('Error to dismiss');
    let currentId = '';
    service.notifications$.subscribe(n => {
      if (n.length > 0) {
        currentId = n[0].id;
      }
    });

    expect(currentId).toBeTruthy();
    service.dismiss(currentId);
    let afterDismiss: AppNotification[] = [];
    service.notifications$.subscribe(n => {
      afterDismiss = n;
    });
    expect(afterDismiss.length).toBe(0);
  });

  it('should update loading state', () => {
    service.setLoading(true);
    let loadingState = false;
    service.loading$.subscribe(isLoading => {
      loadingState = isLoading;
    });
    expect(loadingState).toBe(true);

    service.setLoading(false);
    expect(loadingState).toBe(false);
  });
});

