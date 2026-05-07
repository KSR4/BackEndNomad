import { Router } from "express";
import { PostResendVerificationEmailController } from "../../controllers/user/postResendVerificationEmailController";
import { UserNotVerifiedMiddleware } from "../../middlewares/userNotVerifiedMiddleware";

export function postResendVerificationEmailRoute(router: Router) {
    router.post("/v1/resend-verification", new UserNotVerifiedMiddleware().run, new PostResendVerificationEmailController().run)
}
