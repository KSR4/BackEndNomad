import { EntitySchema } from "typeorm"
import { Ticket } from "../entities/ticket"

export const TicketModel = new EntitySchema<Ticket>({
    name: "Ticket",
    tableName: "ticket",
    target: Ticket,
    columns: {
        id: {
            type: String,
            primary: true
        },
        userId: {
            type: String
        },
        shopName: {
            type: String
        },
        message: {
            type: String
        },
        accepted: {
            type: Boolean
        },
        createdAt: {
            type: Date
        },
        latitude: {
            type: "double precision"
        },
        longitude: {
            type: "double precision"
        }
    }
})
