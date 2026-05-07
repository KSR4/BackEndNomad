import { Router } from "express";
import { UserMiddleware } from "../../middlewares/userMiddleware";
import { GetNotificationsController } from "../../controllers/notification/getNotificationsController";

export function getNotificationsRoute(router: Router) {
    router.get("/v1/notification", new UserMiddleware().run, new GetNotificationsController().run)
}
