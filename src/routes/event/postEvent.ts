import { Router } from "express";
import { PostEventController } from "../../controllers/event/postEventController";
import { UserAdminMiddleware } from "../../middlewares/userAdminMiddleware";

export function postEventRoute(router: Router) {
    router.post("/v1/event", new UserAdminMiddleware().run, new PostEventController().run)
}
