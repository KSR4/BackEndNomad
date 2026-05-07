import { Router } from "express";
import { GetShopOrdersController } from "../../controllers/order/getShopOrdersController";
import { UserMiddleware } from "../../middlewares/userMiddleware";

export function getShopOrdersRoute(router: Router) {
    router.get("/v1/order/shop/:id", new UserMiddleware().run, new GetShopOrdersController().run)
}
