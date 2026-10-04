import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AppNotification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
  autoClose?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<AppNotification[]>([]);
  public notifications$: Observable<AppNotification[]> = this.notificationsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  showSuccess(message: string): void {
    this.addNotification({
      id: this.generateId(),
      type: 'success',
      message,
      autoClose: true
    });
  }

  showWarning(message: string): void {
    this.addNotification({
      id: this.generateId(),
      type: 'warning',
      message,
      autoClose: false
    });
  }

  showError(message: string): void {
    this.addNotification({
      id: this.generateId(),
      type: 'error',
      message,
      autoClose: false
    });
  }

  showInfo(message: string): void {
    this.addNotification({
      id: this.generateId(),
      type: 'info',
      message,
      autoClose: true
    });
  }

  dismiss(id: string): void {
    const current = this.notificationsSubject.getValue();
    this.notificationsSubject.next(current.filter(n => n.id !== id));
  }

  clearAll(): void {
    this.notificationsSubject.next([]);
  }

  setLoading(isLoading: boolean): void {
    this.loadingSubject.next(isLoading);
  }

  private addNotification(notification: AppNotification): void {
    const current = this.notificationsSubject.getValue();
    this.notificationsSubject.next([...current, notification]);

    if (notification.autoClose) {
      setTimeout(() => {
        this.dismiss(notification.id);
      }, 5000);
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
  }
}

