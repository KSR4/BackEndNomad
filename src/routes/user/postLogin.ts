import { Router } from "express";
import { PostLoginUserController } from "../../controllers/postLoginUserController";

export function postUserLoginRoute (router: Router) {
    router.post("/v1/login", new PostLoginUserController().run)
}