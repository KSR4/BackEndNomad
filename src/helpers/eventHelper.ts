import { Helper } from "./helper";
import { EntitySchema } from "typeorm";
import { EventModel } from "../model/event.model";
import { Event } from "../entities/event";

export class eventHelper extends Helper<Event> {
    
    getEntitySchema(): EntitySchema<Event> {
        return EventModel
    }

    async findEventById (id: string): Promise<Event | null> {
        return (await this.getRepository()).findOneBy({id})
    }

    async findAll(): Promise<Event[] | null> {
        return (await this.getRepository()).find()
    }

    async save(event: Event) {
        return (await this.getRepository()).save(event)
    }

    async delete(id: string) {
        return (await this.getRepository()).delete(id)
    }
}