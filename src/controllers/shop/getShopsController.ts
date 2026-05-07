import type { Request, Response } from "express"
import { shopHelper } from "../../helpers/shopHelper"
import { shopService } from "../../service/shopService"
import { ShopNotFound } from "../../errors/shop/shopNotFound"
import { shopEventHelper } from "../../helpers/shopEventHelper"

export class GetShopsController {

    async run(req: Request, res: Response): Promise<Response> {
        try {
            const eventId = req.query.eventId as string
            const service = new shopService(new shopHelper(), new shopEventHelper())
            
            let shops
            if (eventId) {
                shops = await service.findShopsByEventId(eventId)
            } else {
                shops = await service.findAll()
            }

            return res.status(200).json({
                ok: true,
                data: shops
            })
        } catch (e) {
            if (e instanceof ShopNotFound) return res.status(404).send()

            return res.status(500).send()
        }
    }

}