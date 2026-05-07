import { Router } from "express";
import { PostForgotPasswordController } from "../../controllers/user/postForgotPasswordController";

export function postForgotPasswordRoute(router: Router) {
    router.post("/v1/forgot-password", new PostForgotPasswordController().run)
}
