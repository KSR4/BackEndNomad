import { Router } from "express";
import { UserAdminMiddleware } from "../../middlewares/userAdminMiddleware";
import { GetAllNotificationsController } from "../../controllers/notification/getAllNotificationsController";

export function getAllNotificationsRoute(router: Router) {
    router.get("/v1/notification/all", new UserAdminMiddleware().run, new GetAllNotificationsController().run)
}
