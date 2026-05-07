import { Router } from "express";
import { UserOwnerMiddleware } from "../../middlewares/userOwnerMiddleware";
import { PatchShopScheduleController } from "../../controllers/shop/patchShopScheduleController";

export function patchShopScheduleRoute(router: Router) {
    router.patch("/v1/shop/:id/schedule", new UserOwnerMiddleware().run, new PatchShopScheduleController().run)
}
