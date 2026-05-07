import { Response, Request } from "express"
import { orderService } from "../../service/orderService"
import { orderHelper } from "../../helpers/orderHelper"
import { OrderBadRequest } from "../../errors/order/orderBadRequest"

export class PostOrderController {
    async run(req: Request, res: Response): Promise<Response> {
        try {

            const userId = res.locals.userId
            const service = new orderService(new orderHelper())
            await service.create(userId, req.body.foodtruckId, req.body.pickUpDate, req.body.dishes)

            return res.status(200).json({
                ok: true,
            })
        } catch (e) {
            if (e instanceof OrderBadRequest) return res.status(400).send()
            return res.status(500).send()
        }
    }
}