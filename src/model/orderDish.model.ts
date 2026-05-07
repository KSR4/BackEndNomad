import { EntitySchema } from "typeorm"
import { OrderDish } from "../entities/orderDish"

export const OrderDishModel = new EntitySchema<OrderDish>({
    name: "OrderDish",
    tableName: "order_dish",
    target: OrderDish,
    columns: {
        id: {
            type: String,
            primary: true
        },
        orderId: {
            type: String
        },
        dishId: {
            type: String
        },
        quantity: {
            type: Number
        },
        unitaryPrice: {
            type: Number
        }
    }
})

