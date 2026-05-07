import { Helper } from "./helper";
import { EntitySchema } from "typeorm";
import { LocationLog } from "../entities/locationLog";
import { LocationLogModel } from "../model/locationLog.model";


export class locationLogHelper extends Helper<LocationLog> {
    
    getEntitySchema(): EntitySchema<LocationLog> {
        return LocationLogModel
    }

    async findLocationLogById (id: string): Promise<LocationLog | null> {
        return (await this.getRepository()).findOneBy({id})
    }

    async findAll(): Promise<LocationLog[] | null> {
        return (await this.getRepository()).find()
    }

    async create(locationLog: LocationLog) {
            return (await this.getRepository()).save(locationLog)
    }
}