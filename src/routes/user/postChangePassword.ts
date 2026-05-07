import { Router } from "express";
import { UserMiddleware } from "../../middlewares/userMiddleware";
import { PostChangePasswordController } from "../../controllers/user/postChangePasswordController";

export function postChangePasswordRoute(router: Router) {
    router.post("/v1/user/change-password", new UserMiddleware().run, new PostChangePasswordController().run)
}
