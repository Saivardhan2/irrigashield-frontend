import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorBannerComponent } from './error-banner.component';
import { NotificationService } from '../../services/notification.service';

describe('ErrorBannerComponent', () => {
  let component: ErrorBannerComponent;
  let fixture: ComponentFixture<ErrorBannerComponent>;
  let notificationService: NotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorBannerComponent],
      providers: [NotificationService]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorBannerComponent);
    component = fixture.componentInstance;
    notificationService = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('should create the error banner component', () => {
    expect(component).toBeTruthy();
  });

  it('should render toast notifications when present', () => {
    notificationService.showError('Critical failure');
    fixture.detectChanges();

    const alert = fixture.nativeElement.querySelector('.toast-alert');
    expect(alert).toBeTruthy();
    expect(alert.textContent).toContain('Critical failure');
  });

  it('should allow dismissing a toast', () => {
    notificationService.showWarning('Attention needed');
    fixture.detectChanges();

    const closeBtn = fixture.nativeElement.querySelector('.toast-close');
    expect(closeBtn).toBeTruthy();
    closeBtn.click();
    fixture.detectChanges();

    const alert = fixture.nativeElement.querySelector('.toast-alert');
    expect(alert).toBeFalsy();
  });
});

