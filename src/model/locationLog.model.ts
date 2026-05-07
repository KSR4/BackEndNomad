import { EntitySchema } from "typeorm"
import { LocationLog } from "../entities/locationLog"



export const LocationLogModel = new EntitySchema<LocationLog>({
    name: "LocationLog",
    tableName: "location_log",
    target: LocationLog,
    columns: {
        id: {
            type: String,
            primary: true
        },
        userId: {
            type: String
        },
        latitude: {
            type: "double precision"
        },
        longitude: {
            type: "double precision"
        },
        createdAt: {
            type: Date
        }
    }
})


