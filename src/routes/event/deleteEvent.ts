import { Router } from "express";
import { DeleteEventController } from "../../controllers/event/deleteEventController";
import { UserAdminMiddleware } from "../../middlewares/userAdminMiddleware";

export function deleteEventRoute(router: Router) {
    router.delete("/v1/event/:id", new UserAdminMiddleware().run, new DeleteEventController().run)
}
