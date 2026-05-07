import { Request, Response } from "express"
import { shopEventService } from "../../service/shopEventService"
import { shopEventHelper } from "../../helpers/shopEventHelper"
import { ShopEventBadRequest } from "../../errors/shopEvent/shopEventBadRequest"
import { Role } from "../../entities/user"
import { EventNotFound } from "../../errors/event/eventNotFound"
import { ShopNotFound } from "../../errors/shop/shopNotFound"

export class PostShopEventController {
    async run(req: Request, res: Response): Promise<Response> {
        try {
            const userId = res.locals.userId
            const role = res.locals.userOwner // role from middleware
            
            const isAdmin = role === Role.ADMIN

            const { eventId, shopId } = req.body

            if (!eventId || !shopId) {
                return res.status(400).json({ ok: false, message: "eventId and shopId are required in body" })
            }

            const service = new shopEventService(new shopEventHelper())
            await service.create(eventId, shopId, userId, isAdmin)

            return res.status(201).json({ ok: true })

        } catch (e) {
            if (e instanceof ShopEventBadRequest) return res.status(400).json({ ok: false, message: e.message })
            if (e instanceof EventNotFound) return res.status(404).json({ ok: false, message: "Event not found" })
            if (e instanceof ShopNotFound) return res.status(404).json({ ok: false, message: "Shop not found" })
            return res.status(500).send()
        }
    }
}
