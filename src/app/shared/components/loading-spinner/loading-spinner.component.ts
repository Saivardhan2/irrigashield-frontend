import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {
  private notificationService = inject(NotificationService);
  public loading$ = this.notificationService.loading$;
}

