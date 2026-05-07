import { EntitySchema } from "typeorm"
import { Log } from "../entities/log"

export const LogModel = new EntitySchema<Log>({
    name: "Log",
    tableName: "log",
    target: Log,
    columns: {
        id: {
            type: String,
            primary: true
        },
        level: {
            type: String
        },
        message: {
            type: "text"
        },
        context: {
            type: "text",
            nullable: true
        },
        createdAt: {
            type: "timestamp",
            createDate: true
        }
    }
})
