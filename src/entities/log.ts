import { Entity } from "./entity"
import { v4 as uuidv4 } from "uuid"

export enum LogLevel {
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    DEBUG = "DEBUG"
}

export class Log implements Entity {
    constructor(
        readonly id: string,
        readonly level: LogLevel,
        readonly message: string,
        readonly context: string | null,
        readonly createdAt: Date
    ) { }

    static create(level: LogLevel, message: string, context: any = null): Log {
        return new Log(
            uuidv4(),
            level,
            message,
            context ? JSON.stringify(context) : null,
            new Date()
        )
    }

    getPrimitive() {
        return {
            id: this.id,
            level: this.level,
            message: this.message,
            context: this.context,
            createdAt: this.createdAt
        }
    }
}
