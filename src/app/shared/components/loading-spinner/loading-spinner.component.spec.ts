import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { NotificationService } from '../../services/notification.service';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;
  let notificationService: NotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSpinnerComponent],
      providers: [NotificationService]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    notificationService = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('should create the loading spinner component', () => {
    expect(component).toBeTruthy();
  });

  it('should not display overlay when loading is false', () => {
    notificationService.setLoading(false);
    fixture.detectChanges();
    const overlay = fixture.nativeElement.querySelector('.spinner-overlay');
    expect(overlay).toBeFalsy();
  });

  it('should display overlay when loading is true', () => {
    notificationService.setLoading(true);
    fixture.detectChanges();
    const overlay = fixture.nativeElement.querySelector('.spinner-overlay');
    expect(overlay).toBeTruthy();
  });
});

