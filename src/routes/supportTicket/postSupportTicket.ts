import { Router } from "express"
import { UserMiddleware } from "../../middlewares/userMiddleware"
import { PostSupportTicketController } from "../../controllers/supportTicket/postSupportTicketController"

export function postSupportTicketRoute(router: Router) {
    router.post("/v1/support-ticket", new UserMiddleware().run, new PostSupportTicketController().run)
}
