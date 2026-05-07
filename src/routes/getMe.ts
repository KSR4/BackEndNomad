import { Router } from "express";
import { GetMeController } from "../controllers/getMeController";
import { UserNotVerifiedMiddleware } from "../middlewares/userNotVerifiedMiddleware";

export function getMeRoute(router: Router) {
    router.get("/v1/me", new UserNotVerifiedMiddleware().run, new GetMeController().run)
}