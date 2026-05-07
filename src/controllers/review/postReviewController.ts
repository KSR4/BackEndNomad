import { Request, Response } from "express"
import { orderService } from "../../service/orderService"
import { orderHelper } from "../../helpers/orderHelper"
import { reviewService } from "../../service/reviewService";
import { reviewHelper } from "../../helpers/reviewHelper";
import { OrderNotFound } from "../../errors/order/orderNotFound";
import { ReviewBadRequest } from "../../errors/review/reviewBadRequest";

export class PostReviewController {

    async run(req: Request, res: Response): Promise<Response> {

        try {
            const id = req.params.id
            if (!id) {
                return res.status(400).json({
                    ok: false,
                    message: "Param 'id' is required"
                });
            }

            const orderservice = new orderService(new orderHelper)
            const order = await orderservice.findOrderById(id)
            const userId = res.locals.userId
            const service = new reviewService(new reviewHelper())

            await service.create(userId, order.id, order.shopId, req.body.text, req.body.date)

            return res.status(200).json({
                ok: true,
            })
        } catch (e) {
            if (e instanceof OrderNotFound) return res.status(404).send()
            if (e instanceof ReviewBadRequest) return res.status(400).json({ ok: false, message: e.message })

            return res.status(500).json({
            })
        }
    }

}