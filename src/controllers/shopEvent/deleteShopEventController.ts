import { Request, Response } from "express"
import { shopEventService } from "../../service/shopEventService"
import { shopEventHelper } from "../../helpers/shopEventHelper"
import { ShopEventBadRequest } from "../../errors/shopEvent/shopEventBadRequest"
import { Role } from "../../entities/user"
import { ShopNotFound } from "../../errors/shop/shopNotFound"

export class DeleteShopEventController {
    async run(req: Request, res: Response): Promise<Response> {
        try {
            const userId = res.locals.userId
            const role = res.locals.userOwner
            const isAdmin = role === Role.ADMIN

            const shopId = req.params.shopId

            if (!shopId) {
                return res.status(400).json({ ok: false, message: "shopId is required" })
            }

            const service = new shopEventService(new shopEventHelper())
            await service.unsubscribe(shopId, userId, isAdmin)

            return res.status(200).json({ ok: true })

        } catch (e) {
            if (e instanceof ShopEventBadRequest) return res.status(400).json({ ok: false, message: e.message })
            if (e instanceof ShopNotFound) return res.status(404).json({ ok: false, message: "Shop not found" })
            return res.status(500).send()
        }
    }
}
