import { Router } from "express";
import { UserMiddleware } from "../../middlewares/userMiddleware";
import { PatchEmailController } from "../../controllers/user/patchEmailController";

export function patchUserEmailRoute (router: Router) {
    router.patch("/v1/user/:id/email", new UserMiddleware().run, new PatchEmailController().run)
}
