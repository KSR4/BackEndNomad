import { Helper } from "./helper";
import { EntitySchema } from "typeorm";
import { Event } from "../entities/event";
import { ShopEvent } from "../entities/shopEvent";
import { ShopEventModel } from "../model/shopEvent.model";

export class shopEventHelper extends Helper<ShopEvent> {

    getEntitySchema(): EntitySchema<Event> {
        return ShopEventModel
    }

    async findShopEventById(id: string): Promise<ShopEvent | null> {
        return (await this.getRepository()).findOneBy({ id })
    }

    async findActiveByShopId(shopId: string): Promise<ShopEvent | null> {
        return (await this.getRepository()).findOneBy({ shopId, active: true })
    }

    async findShopsByEventId(eventId: string): Promise<ShopEvent[] | null> {
        return (await this.getRepository()).findBy({ eventId, active: true })
    }

    async findAll(): Promise<ShopEvent[] | null> {
        return (await this.getRepository()).find()
    }

    async save(shopEvent: ShopEvent) {
        return (await this.getRepository()).save(shopEvent)
    }

    async delete(id: string) {
        return (await this.getRepository()).delete(id)
    }
}