import { Router } from "express";
import { UserOwnerMiddleware } from "../../middlewares/userOwnerMiddleware";
import { PatchShopNameController } from "../../controllers/shop/patchShopNameController";

export function patchShopNameRoute(router: Router) {
    router.patch("/v1/shop/:id/name", new UserOwnerMiddleware().run, new PatchShopNameController().run)
}
