import { Helper } from "./helper";
import { LogModel } from "../model/log.model";
import { EntitySchema } from "typeorm";
import { Log } from "../entities/log";

export class logHelper extends Helper<Log> {
    getEntitySchema(): EntitySchema<Log> {
        return LogModel
    }

    async save(log: Log): Promise<Log> {
        return (await this.getRepository()).save(log)
    }

    async findAll(): Promise<Log[]> {
        return (await this.getRepository()).find({
            order: { createdAt: "DESC" }
        })
    }

    async findByLevel(level: string): Promise<Log[]> {
        return (await this.getRepository()).find({
            where: { level: level as any },
            order: { createdAt: "DESC" }
        })
    }
}
