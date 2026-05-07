import { Router } from "express";
import { GetShopController } from "../../controllers/shop/getShopController";
import { UserMiddleware } from "../../middlewares/userMiddleware";

export function getShopRoute(router: Router) {
    router.get("/v1/shop/:id", new UserMiddleware().run, new GetShopController().run)
}