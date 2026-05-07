import { Response, Request } from "express"
import { orderService } from "../../service/orderService"
import { orderHelper } from "../../helpers/orderHelper"
import { OrderNotFound } from "../../errors/order/orderNotFound"

export class GetSelfOrdersController {
    async run(req: Request, res: Response): Promise<Response> {
        try {
            const userId = res.locals.userId

            const service = new orderService(new orderHelper())
            const orders = await service.findMyOrders(userId)
            const detailedOrders = await service.getDetailedOrders(orders)

            return res.status(200).json({
                ok: true,
                data: detailedOrders
            })
        } catch (e) {
            if (e instanceof OrderNotFound) return res.status(404).json({ ok: false, message: e.message })
            return res.status(500).json({ ok: false, message: "Internal server error" })
        }
    }
}
