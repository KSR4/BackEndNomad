import { Router } from "express";
import { PostResetPasswordController } from "../../controllers/user/postResetPasswordController";

export function postResetPasswordRoute(router: Router) {
    router.post("/v1/reset-password", new PostResetPasswordController().run)
}
