import { Router } from "express"
import { UserMiddleware } from "../../middlewares/userMiddleware"
import { PatchNotificationReadController } from "../../controllers/notification/patchNotificationReadController"

export function patchNotificationReadRoute(router: Router) {
    router.patch("/v1/notification/:id/read", new UserMiddleware().run, new PatchNotificationReadController().run)
}
