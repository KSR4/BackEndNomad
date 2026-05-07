import { EntitySchema } from "typeorm"
import { Dish } from "../entities/dish"

export const DishModel = new EntitySchema<Dish>({
    name: "Dish",
    tableName: "dish",
    target: Dish,
    columns: {
        id: {
            type: String,
            primary: true
        },
        shopId: {
            type: String
        },
        name: {
            type: String
        },
        description: {
            type: String
        },
        price: {
            type: Number
        },
        available: {
            type: Boolean
        },
        stock: {
            type: Number
        }
    }
})

