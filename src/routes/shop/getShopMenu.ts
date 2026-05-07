import { Router } from "express";
import { GetShopMenuController } from "../../controllers/shop/getShopMenuController";
import { UserMiddleware } from "../../middlewares/userMiddleware";

export function getShopMenuRoute(router: Router) {
    router.get("/v1/shop/menu/:id", new UserMiddleware().run, new GetShopMenuController().run)
}