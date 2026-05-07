import { Router } from "express";
import { UserOwnerMiddleware } from "../../middlewares/userOwnerMiddleware";
import { PatchShopStateController } from "../../controllers/shop/patchShopStateController";

export function patchShopStateRoute(router: Router) {
    router.patch("/v1/shop/:id/state", new UserOwnerMiddleware().run, new PatchShopStateController().run)
}
