import { Router } from "express";
import { PostOrderController } from "../../controllers/order/postOrderController";
import { UserMiddleware } from "../../middlewares/userMiddleware";

export function postOrderRoute(router: Router) {
    router.post("/v1/order", new UserMiddleware().run, new PostOrderController().run)
}