import { Router } from "express"
import { UserMiddleware } from "../../middlewares/userMiddleware"
import { DeleteShopEventController } from "../../controllers/shopEvent/deleteShopEventController"

export function deleteShopEventRoute(router: Router) {
    router.delete("/v1/shop-event/shop/:shopId", new UserMiddleware().run, new DeleteShopEventController().run)
}
