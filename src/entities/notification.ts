import { Entity } from "./entity"

export class Notification implements Entity {
    constructor(
        readonly id: string,
        readonly title: string,
        readonly message: string,
        readonly userId: string | null,
        readonly isRead: boolean,
        readonly createdAt: Date
    ) {}

    getPrimitive () {
        return {
            id: this.id,
            title: this.title,
            message: this.message,
            userId: this.userId,
            isRead: this.isRead,
            createdAt: this.createdAt
        }
    }

    static create (id: string, title: string, message: string, userId: string | null): Notification {
        return new Notification(id, title, message, userId, false, new Date())
    }

    markAsRead(): Notification {
        return new Notification(this.id, this.title, this.message, this.userId, true, this.createdAt)
    }
}
