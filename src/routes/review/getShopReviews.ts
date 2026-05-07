import { Router } from "express";
import { GetShopReviewsController } from "../../controllers/review/getShopReviewsController";

export function getShopReviewsRoute(router: Router) {
    router.get("/v1/review/shop/:id", new GetShopReviewsController().run)
}
