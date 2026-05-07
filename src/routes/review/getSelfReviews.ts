import { Router } from "express";
import { UserMiddleware } from "../../middlewares/userMiddleware";
import { GetSelfReviewsController } from "../../controllers/review/getSelfReviewsController";

export function getSelfReviewsRoute(router: Router) {
    router.get("/v1/review/self", new UserMiddleware().run, new GetSelfReviewsController().run)
}