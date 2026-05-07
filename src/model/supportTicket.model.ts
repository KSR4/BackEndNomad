import { EntitySchema } from "typeorm"
import { SupportTicket, SupportTicketStatus } from "../entities/supportTicket"

export const SupportTicketModel = new EntitySchema<SupportTicket>({
    name: "SupportTicket",
    tableName: "support_ticket",
    target: SupportTicket,
    columns: {
        id: {
            type: String,
            primary: true
        },
        userId: {
            type: String
        },
        subject: {
            type: String
        },
        description: {
            type: String
        },
        status: {
            type: "enum",
            enum: SupportTicketStatus,
            default: SupportTicketStatus.OPEN
        },
        createdAt: {
            type: Date
        }
    }
})
