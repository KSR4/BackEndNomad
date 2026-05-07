import { Router } from "express";
import { UserOwnerMiddleware } from "../../middlewares/userOwnerMiddleware";
import { PatchShopLocationController } from "../../controllers/shop/patchShopLocationController";

export function patchShopLocationRoute(router: Router) {
    router.patch("/v1/shop/:id/location", new UserOwnerMiddleware().run, new PatchShopLocationController().run)
}
