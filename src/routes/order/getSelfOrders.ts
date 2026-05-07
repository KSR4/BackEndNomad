import { Router } from "express";
import { GetSelfOrdersController } from "../../controllers/order/getSelfOrdersController";
import { UserMiddleware } from "../../middlewares/userMiddleware";

export function getSelfOrdersRoute(router: Router) {
    router.get("/v1/order/self", new UserMiddleware().run, new GetSelfOrdersController().run)
}
