import { Router } from "express"
import { UserAdminMiddleware } from "../../middlewares/userAdminMiddleware"
import { PatchSupportTicketStatusController } from "../../controllers/supportTicket/patchSupportTicketStatusController"

export function patchSupportTicketStatusRoute(router: Router) {
    router.patch("/v1/support-ticket/:id/status", new UserAdminMiddleware().run, new PatchSupportTicketStatusController().run)
}
