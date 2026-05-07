import { Router } from "express";
import { UserMiddleware } from "../../middlewares/userMiddleware";
import { GetEventController } from "../../controllers/event/getEventController";

export function getEventRoute(router: Router) {
    router.get("/v1/event/:id", new UserMiddleware().run, new GetEventController().run)
}