import { Request, Response } from "express";
import { NotificationService } from "./notification.service";

export class NotificationController {
  static create(req: Request, res: Response) {
    const { userId, message } = req.body;

    const notification = NotificationService.create(userId, message);

    return res.status(201).json({
      message: "Notification created",
      notification,
    });
  }
}
