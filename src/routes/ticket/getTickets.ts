import { Router } from "express";
import { GetTicketsController } from "../../controllers/ticket/getTicketsController";
import { UserAdminMiddleware } from "../../middlewares/userAdminMiddleware";

export function getTicketsRoute(router: Router) {
    router.get("/v1/ticket", new UserAdminMiddleware().run, new GetTicketsController().run)
}