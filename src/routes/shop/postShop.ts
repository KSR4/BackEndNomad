import { Router } from "express";
import { UserOwnerMiddleware } from "../../middlewares/userOwnerMiddleware";
import { PostShopController } from "../../controllers/shop/postShopController";

export function postShopRoute(router: Router) {
    router.post("/v1/shop", new UserOwnerMiddleware().run, new PostShopController().run)
}
