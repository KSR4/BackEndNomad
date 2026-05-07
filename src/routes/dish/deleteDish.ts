import { Router } from "express";
import { UserOwnerMiddleware } from "../../middlewares/userOwnerMiddleware";
import { DeleteDishController } from "../../controllers/dish/deleteDishController";

export function deleteDishRoute(router: Router) {
    router.delete("/v1/dish/:id", new UserOwnerMiddleware().run, new DeleteDishController().run)
}
