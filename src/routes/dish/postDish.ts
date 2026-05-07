import { Router } from "express";
import { PostDishController } from "../../controllers/dish/postDishController";
import { UserOwnerMiddleware } from "../../middlewares/userOwnerMiddleware";

export function postDishRoute(router: Router) {
    router.post("/v1/dish", new UserOwnerMiddleware().run, new PostDishController().run)
}