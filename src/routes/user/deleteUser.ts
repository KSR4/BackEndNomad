import { Router } from "express";
import { DeleteUserController } from "../../controllers/user/deleteUserController";
import { UserMiddleware } from "../../middlewares/userMiddleware";

export function deleteUserRoute(router: Router) {
    router.delete("/v1/user", new UserMiddleware().run, new DeleteUserController().run)
}