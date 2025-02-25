import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  private notifications: string[] = [];

  sendNotification(message: string) {
    this.notifications.push(message);
  }

  getNotifications(): string[] {
    return this.notifications;
  }

  clearNotifications(): void {
    this.notifications = [];
  }
}
