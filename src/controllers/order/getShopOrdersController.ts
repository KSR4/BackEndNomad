import { Response, Request } from "express"
import { orderService } from "../../service/orderService"
import { orderHelper } from "../../helpers/orderHelper"
import { orderState } from "../../entities/order"
import { OrderNotFound } from "../../errors/order/orderNotFound"
import { shopService } from "../../service/shopService"
import { shopHelper } from "../../helpers/shopHelper"

import { ShopNotFound } from "../../errors/shop/shopNotFound"

export class GetShopOrdersController {
    async run(req: Request, res: Response): Promise<Response> {
        try {
            const shopId = req.params.id as string
            const userId = res.locals.userId as string

            const sService = new shopService(new shopHelper())
            const shop = await sService.findShopById(shopId)

            if (shop.ownerId !== userId && res.locals.userOwner !== "ADMIN") {
                return res.status(403).json({
                    ok: false,
                    message: "Forbidden: You are not the owner of this shop"
                })
            }

            const oService = new orderService(new orderHelper())
            const orders = await oService.findOrdersByShopId(shopId)

            const detailedOrders = await oService.getDetailedOrders(orders)

            return res.status(200).json({
                ok: true,
                data: detailedOrders
            })
        } catch (e: any) {
            console.error("DEBUG ERROR GetShopOrders:", e);
            if (e instanceof OrderNotFound) return res.status(404).json({ ok: false, message: e.message })
            if (e instanceof ShopNotFound) return res.status(404).json({ ok: false, message: e.message })
            return res.status(500).json({ ok: false, message: "Internal server error", error: e?.message })
        }
    }
}
