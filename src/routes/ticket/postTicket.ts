import { Router } from "express";
import { UserMiddleware } from "../../middlewares/userMiddleware";
import { PostTicketController } from "../../controllers/ticket/postTicketController";

export function postTicketRoute(router: Router) {
    router.post("/v1/ticket", new UserMiddleware().run, new PostTicketController().run)
}