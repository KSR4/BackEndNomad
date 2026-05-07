import { Entity } from "./entity"


export class ShopEvent implements Entity {
    constructor(
        readonly id: string,
        readonly eventId: string,
        readonly shopId: string,
        readonly active: boolean
    ) {}

    getPrimitive () {
        return {
            id: this.id,
            eventId: this.eventId,
            shopId: this.shopId,
            active: this.active
        }
    }

    static create (id: string, eventId: string, shopId: string, active: boolean): ShopEvent {
        return new ShopEvent(id, eventId, shopId, active)
    }

    update (active: boolean): ShopEvent {
        return new ShopEvent(
            this.id,
            this.eventId,
            this.shopId,
            active
        )
    }

}