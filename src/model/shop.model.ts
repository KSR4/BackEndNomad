import { EntitySchema } from "typeorm"
import { Shop } from "../entities/shop"


export const ShopModel = new EntitySchema<Shop>({
    name: "Shop",
    tableName: "shop",
    target: Shop,
    columns: {
        id: {
            type: String,
            primary: true
        },
        name: {
            type: String
        },
        ownerId: {
            type: String
        },
        state: {
            type: String
        },
        openDate: {
            type: "timestamp",
            nullable: true
        },
        closeDate: {
            type: "timestamp",
            nullable: true
        },
        latitude: {
            type: "double precision"
        },
        longitude: {
            type: "double precision"
        }
    }
})


