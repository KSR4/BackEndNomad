import { Router } from "express"
import { UserMiddleware } from "../../middlewares/userMiddleware"
import { GetSelfSupportTicketsController } from "../../controllers/supportTicket/getSelfSupportTicketsController"

export function getSelfSupportTicketsRoute(router: Router) {
    router.get("/v1/support-ticket/me", new UserMiddleware().run, new GetSelfSupportTicketsController().run)
}
