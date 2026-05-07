import { Router } from "express";
import { PutShopController } from "../../controllers/shop/putShopController";
import { UserOwnerMiddleware } from "../../middlewares/userOwnerMiddleware";

export function putShopRoute(router: Router) {
    router.put("/v1/shop/:id", new UserOwnerMiddleware().run, new PutShopController().run)
}
