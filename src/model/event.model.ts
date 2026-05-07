import { EntitySchema } from "typeorm"
import { Event } from "../entities/event"

export const EventModel = new EntitySchema<Event>({
    name: "Event",
    tableName: "event",
    target: Event,
    columns: {
        id: {
            type: String,
            primary: true
        },
        name: {
            type: String
        },
        description: {
            type: String
        },
        location: {
            type: String
        },
        latitude: {
            type: "double precision"
        },
        longitude: {
            type: "double precision"
        },
        startDate: {
            type: String
        },
        finishDate: {
            type: String
        }
    }
})

