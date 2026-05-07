import { Helper } from "./helper";
import { EntitySchema } from "typeorm";
import { Review } from "../entities/review";
import { ReviewModel } from "../model/review.model";


export class reviewHelper extends Helper<Review> {

    getEntitySchema(): EntitySchema<Review> {
        return ReviewModel
    }

    async findReviewById(id: string): Promise<Review | null> {
        return (await this.getRepository()).findOneBy({ id })
    }

    async create(review: Review) {
        return (await this.getRepository()).save(review)
    }

    async findSelfReviews(userId: string): Promise<Review[]> {
        return (await this.getRepository()).find({ where: { userId } })
    }

    async findReviewsByShopId(shopId: string): Promise<Review[]> {
        return (await this.getRepository()).find({ where: { shopId } })
    }

    async findReviewByOrderId(orderId: string): Promise<Review | null> {
        return (await this.getRepository()).findOneBy({ orderId })
    }
}