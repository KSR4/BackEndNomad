import { EntitySchema } from "typeorm"
import { Notification } from "../entities/notification"

export const NotificationModel = new EntitySchema<Notification>({
    name: "Notification",
    tableName: "notification",
    target: Notification,
    columns: {
        id: {
            type: String,
            primary: true
        },
        title: {
            type: String
        },
        message: {
            type: String
        },
        userId: {
            type: String,
            nullable: true
        },
        isRead: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date
        }
    }
})
