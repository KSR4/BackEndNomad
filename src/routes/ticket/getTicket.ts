import { Router } from "express";
import { UserAdminMiddleware } from "../../middlewares/userAdminMiddleware";
import { GetTicketController } from "../../controllers/ticket/getTicketController";

export function getTicketRoute(router: Router) {
    router.get("/v1/ticket/:id", new UserAdminMiddleware().run, new GetTicketController().run)
}