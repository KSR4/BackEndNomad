import { Router } from "express";
import { UserOwnerMiddleware } from "../../middlewares/userOwnerMiddleware";
import { PutDishController } from "../../controllers/dish/putDishController";

export function putDishRoute(router: Router) {
    router.put("/v1/dish/:id", new UserOwnerMiddleware().run, new PutDishController().run)
}
