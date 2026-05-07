import { Router } from "express";
import { UserMiddleware } from "../../middlewares/userMiddleware";
import { PatchUsernameController } from "../../controllers/user/patchUsernameController";

export function patchUserUsernameRoute (router: Router) {
    router.patch("/v1/user/:id/username", new UserMiddleware().run, new PatchUsernameController().run)
}
