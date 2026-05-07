import { Router } from "express";
import { PostVerifyEmailController } from "../../controllers/user/postVerifyEmailController";

export function postVerifyEmailRoute(router: Router) {
    router.post("/v1/verify-email", new PostVerifyEmailController().run)
}
