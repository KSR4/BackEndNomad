import { Router } from "express";
import { UserAdminMiddleware } from "../../middlewares/userAdminMiddleware";
import { PatchTicketAcceptedController } from "../../controllers/ticket/patchTicketAcceptedController";

export function patchTicketAcceptedRoute(router: Router) {
    router.patch("/v1/ticket/:id/accepted", new UserAdminMiddleware().run, new PatchTicketAcceptedController().run)
}
