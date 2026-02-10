interface Notification {
  id: number;
  userId: number;
  message: string;
  read: boolean;
  createdAt: Date;
}

export class NotificationService {
  static create(userId: number, message: string): Notification {
    return {
      id: Date.now(),
      userId,
      message,
      read: false,
      createdAt: new Date(),
    };
  }

  static markAsRead(notification: Notification): Notification {
    notification.read = true;
    return notification;
  }
}
