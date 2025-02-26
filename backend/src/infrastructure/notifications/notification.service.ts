// Objet: Définition de la classe NotificationService
export class NotificationService {
    sendNotification(recipient: string, message: string): void {
      console.log(`🔔 Notification envoyée à ${recipient}: ${message}`);
    }
  }
  