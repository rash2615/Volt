import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  private notifications: string[] = [];

  // Send a notification
  sendNotification(message: string) {
    this.notifications.push(message);
  }

  // Get all notifications
  getNotifications(): string[] {
    return this.notifications;
  }

  // Clear
  clearNotifications(): void {
    this.notifications = [];
  }
}
