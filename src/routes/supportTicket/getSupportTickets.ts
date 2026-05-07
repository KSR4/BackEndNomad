import { Router } from "express"
import { UserAdminMiddleware } from "../../middlewares/userAdminMiddleware"
import { GetSupportTicketsController } from "../../controllers/supportTicket/getSupportTicketsController"

export function getSupportTicketsRoute(router: Router) {
    router.get("/v1/support-ticket", new UserAdminMiddleware().run, new GetSupportTicketsController().run)
}
