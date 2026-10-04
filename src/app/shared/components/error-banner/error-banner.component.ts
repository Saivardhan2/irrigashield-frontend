import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-error-banner',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './error-banner.component.html',
  styleUrl: './error-banner.component.scss'
})
export class ErrorBannerComponent {
  private notificationService = inject(NotificationService);
  public notifications$ = this.notificationService.notifications$;

  dismiss(id: string): void {
    this.notificationService.dismiss(id);
  }
}

