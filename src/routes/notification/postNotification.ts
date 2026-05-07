import { Router } from "express";
import { UserAdminMiddleware } from "../../middlewares/userAdminMiddleware";
import { PostNotificationController } from "../../controllers/notification/postNotificationController";

export function postNotificationRoute(router: Router) {
    router.post("/v1/notification", new UserAdminMiddleware().run, new PostNotificationController().run)
}
