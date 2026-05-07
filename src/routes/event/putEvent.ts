import { Router } from "express";
import { PutEventController } from "../../controllers/event/putEventController";
import { UserAdminMiddleware } from "../../middlewares/userAdminMiddleware";

export function putEventRoute(router: Router) {
    router.put("/v1/event/:id", new UserAdminMiddleware().run, new PutEventController().run)
}
