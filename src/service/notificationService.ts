import { v4 as uuidv4 } from "uuid";
import { notificationHelper } from "../helpers/notification.helper";
import { Notification } from "../entities/notification";
import { NotificationNotFound } from "../errors/notification/notificationNotFound";
import { NotificationBadRequest } from "../errors/notification/notificationBadRequest";

export class notificationService {

    constructor ( private readonly helper: notificationHelper ) {}

    async create(title: string, message: string, userId: string | null) {
        if (!title || !message) {
            throw new NotificationBadRequest("Title and message are required");
        }

        const notification = Notification.create(uuidv4(), title, message, userId);
        await this.helper.save(notification);
    }

    async findByUserId(userId: string): Promise<Notification[]> {
        const notifications = await this.helper.findByUserId(userId)

        if (notifications == null || notifications.length === 0) {
            throw new NotificationNotFound("No notifications found")
        }

        return notifications
    }

    async findAll(): Promise<Notification[]> {
        const notifications = await this.helper.findAll()

        if (notifications == null || notifications.length === 0) {
            throw new NotificationNotFound("No notifications found")
        }

        return notifications
    }

    async markAsRead(notificationId: string, userId: string): Promise<void> {
        const notification = await this.helper.findById(notificationId)

        if (!notification) {
            throw new NotificationNotFound(`Notification with id ${notificationId} not found`)
        }

        // Solo puede marcarla el propio usuario o si es broadcast (userId null)
        if (notification.userId !== null && notification.userId !== userId) {
            throw new NotificationBadRequest("You cannot mark this notification as read")
        }

        const updated = notification.markAsRead()
        await this.helper.save(updated)
    }
}
