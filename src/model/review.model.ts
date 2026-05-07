import { EntitySchema } from "typeorm"
import { Review } from "../entities/review"

export const ReviewModel = new EntitySchema<Review>({
    name: "Review",
    tableName: "review",
    target: Review,
    columns: {
        id: {
            type: String,
            primary: true
        },
        userId: {
            type: String
        },
        orderId: {
            type: String
        },
        shopId: {
            type: String
        },
        text: {
            type: String
        },
        date: {
            type: String
        }
    }
})
