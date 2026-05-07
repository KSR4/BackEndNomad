import { Router } from "express";
import { RegisterController } from "../../controllers/postRegisterUserController";

export function registerRoute (router: Router) { 
    router.post("/v1/register", new RegisterController().run)
}