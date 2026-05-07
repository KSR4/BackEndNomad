import { Router } from "express";
import { GetHealthController } from "../controllers/getHealthController";

export function getHealthRoute (router: Router) {
    router.get("/v1/health", new GetHealthController().run)
}