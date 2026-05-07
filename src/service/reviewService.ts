import { v4 as uuidv4 } from "uuid";
import { Review } from "../entities/review";
import { reviewHelper } from "../helpers/reviewHelper";
import { ReviewNotFound } from "../errors/review/reviewNotFound";
import { orderService } from "./orderService";
import { orderHelper } from "../helpers/orderHelper";
import { OrderNotFound } from "../errors/order/orderNotFound";
import { ReviewUnauthorized } from "../errors/review/reviewUnathorized";
import { ReviewCreateFailed } from "../errors/review/reviewCreateFailed";
import { ReviewBadRequest } from "../errors/review/reviewBadRequest";

export class reviewService {

    constructor(private readonly helper: reviewHelper) { }

    async findReviewById(id: string): Promise<Review> {

        const review = await this.helper.findReviewById(id)

        if (!review) {
            throw new ReviewNotFound(`The review with id ${id} can't be reach`)
        }
        return review
    }

    async create(userId: string, orderId: string, shopId: string, text: string, date: string) {
        if (!userId || !orderId || !shopId || !text || !date) {
            throw new ReviewBadRequest(`The params cannot be null or undefined`);
        }
        const oService = new orderService(new orderHelper)
        const dish = await oService.findOrderById(orderId)

        if (!dish) {
            throw new OrderNotFound(`The order with id ${orderId} can't be reach`)
        }

        if (dish.state !== "DELIVERED") {
            throw new ReviewUnauthorized(`The review isn't picked up yet!`)
        }

        const existingReview = await this.helper.findReviewByOrderId(orderId)
        if (existingReview) {
            throw new ReviewBadRequest(`A review already exists for this order`)
        }

        const review = new Review(uuidv4(), userId, orderId, shopId, text, date);
        try {
            await this.helper.create(review);
        } catch (e) {
            throw new ReviewCreateFailed(`The review with id: ${review.id} can't be reach`);
        }
    }

    async findSelfReviews(userId: string): Promise<Review[]> {
        const reviews = await this.helper.findSelfReviews(userId)
        if (!reviews) {
            throw new ReviewNotFound(`The review with id ${userId} can't be reach`)
        }
        return reviews
    }

    async findReviewsByShopId(shopId: string): Promise<Review[]> {
        return await this.helper.findReviewsByShopId(shopId)
    }
}