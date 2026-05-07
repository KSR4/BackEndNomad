import { Router } from "express";
import { GetUsersController } from "../../controllers/user/getUsersController";
import { UserAdminMiddleware } from "../../middlewares/userAdminMiddleware";

export function getUsersRoute(router: Router) {
    router.get("/v1/user", new UserAdminMiddleware().run, new GetUsersController().run)
}
