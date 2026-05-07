import { Router } from "express";
import { UserMiddleware } from "../../middlewares/userMiddleware";
import { PatchPasswordController } from "../../controllers/user/patchPasswordController";

export function patchUserPasswordRoute (router: Router) {
    router.patch("/v1/user/:id/password", new UserMiddleware().run, new PatchPasswordController().run)
}
