import { Helper } from "./helper";
import { EntitySchema } from "typeorm";
import { Notification } from "../entities/notification";
import { NotificationModel } from "../model/notification.model";
import { IsNull } from "typeorm";


export class notificationHelper extends Helper<Notification> {
    
    getEntitySchema(): EntitySchema<Notification> {
        return NotificationModel
    }

    async findById (id: string): Promise<Notification | null> {
        return (await this.getRepository()).findOneBy({id})
    }

    async findByUserId (userId: string): Promise<Notification[]> {
        return (await this.getRepository()).find({
            where: [
                { userId: userId },
                { userId: IsNull() }
            ],
            order: { createdAt: "DESC" }
        })
    }

    async findAll(): Promise<Notification[]> {
        return (await this.getRepository()).find({
            order: { createdAt: "DESC" }
        })
    }

    async save(notification: Notification) {
        return (await this.getRepository()).save(notification)
    }
}
