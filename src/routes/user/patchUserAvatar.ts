import { Router } from "express";
import { PatchAvatarController } from "../../controllers/user/patchAvatarController";
import { UserMiddleware } from "../../middlewares/userMiddleware";

export function patchUserAvatarRoute (router: Router) {
    router.patch("/v1/user/:id/avatar", new UserMiddleware().run, new PatchAvatarController().run)
}
