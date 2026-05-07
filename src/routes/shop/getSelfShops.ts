import { Router } from "express";
import { GetSelfShopsController } from "../../controllers/shop/getSelfShopsController";
import { UserOwnerMiddleware } from "../../middlewares/userOwnerMiddleware";

export function getSelfShopsRoute(router: Router) {
    router.get("/v1/shop/self", new UserOwnerMiddleware().run, new GetSelfShopsController().run)
}
