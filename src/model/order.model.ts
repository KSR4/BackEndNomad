import { EntitySchema } from "typeorm"
import { Order } from "../entities/order"

export const OrderModel = new EntitySchema<Order>({
    name: "Order",
    tableName: "order",
    target: Order,
    columns: {
        id: {
            type: String,
            primary: true
        },
        userId: {
            type: String
        },
        shopId: {
            type: String
        },
        eventId: {
            type: String,
            nullable: true
        },
        pickUpDate: {
            type: String
        },
        state: {
            type: String
        },
        changeReason: {
            type: String
        }
    }
})
