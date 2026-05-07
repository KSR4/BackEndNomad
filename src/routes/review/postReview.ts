import { Router } from "express";
import { UserMiddleware } from "../../middlewares/userMiddleware";
import { PostReviewController } from "../../controllers/review/postReviewController";

export function postReviewRoute(router: Router) {
    router.post("/v1/review/:id", new UserMiddleware().run, new PostReviewController().run)
}

