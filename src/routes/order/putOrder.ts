import { Router } from "express";
import { UserMiddleware } from "../../middlewares/userMiddleware";
import { PutOrderController } from "../../controllers/order/putOrderController";

export function putOrderRoute(router: Router) {
    router.put("/v1/order/:id", new UserMiddleware().run, new PutOrderController().run)
}
