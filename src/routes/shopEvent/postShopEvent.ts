import { Router } from "express"
import { UserMiddleware } from "../../middlewares/userMiddleware"
import { PostShopEventController } from "../../controllers/shopEvent/postShopEventController"

export function postShopEventRoute(router: Router) {
    router.post("/v1/shop-event", new UserMiddleware().run, new PostShopEventController().run)
}
