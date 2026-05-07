import { EntitySchema } from "typeorm"
import { ShopEvent } from "../entities/shopEvent"

export const ShopEventModel = new EntitySchema<ShopEvent>({
    name: "ShopEvent",
    tableName: "shop_event",
    target: ShopEvent,
    columns: {
        id: {
            type: String,
            primary: true
        },
        eventId: {
            type: String
        },
        shopId: {
            type: String
        },
        active: {
            type: Boolean
        }
    }
})

