import { Router } from "express";
import { UserMiddleware } from "../../middlewares/userMiddleware";
import { GetEventsController } from "../../controllers/event/getEventsController";

export function getEventsRoute(router: Router) {
    router.get("/v1/event", new UserMiddleware().run, new GetEventsController().run)
}