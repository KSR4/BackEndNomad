import { Entity } from "./entity"

export enum SupportTicketStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    CLOSED = "CLOSED"
}

export class SupportTicket implements Entity {
    constructor(
        readonly id: string,
        readonly userId: string,
        readonly subject: string,
        readonly description: string,
        readonly status: SupportTicketStatus,
        readonly createdAt: Date
    ) {}

    getPrimitive() {
        return {
            id: this.id,
            userId: this.userId,
            subject: this.subject,
            description: this.description,
            status: this.status,
            createdAt: this.createdAt
        }
    }

    static create(id: string, userId: string, subject: string, description: string): SupportTicket {
        return new SupportTicket(id, userId, subject, description, SupportTicketStatus.OPEN, new Date())
    }

    updateStatus(status: SupportTicketStatus): SupportTicket {
        return new SupportTicket(this.id, this.userId, this.subject, this.description, status, this.createdAt)
    }
}
