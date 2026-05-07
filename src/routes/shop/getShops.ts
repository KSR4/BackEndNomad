import { Router } from "express";
import { GetShopsController } from "../../controllers/shop/getShopsController";
import { UserMiddleware } from "../../middlewares/userMiddleware";

export function getShopsRoute(router: Router) {
    router.get("/v1/shop", new UserMiddleware().run, new GetShopsController().run)
}