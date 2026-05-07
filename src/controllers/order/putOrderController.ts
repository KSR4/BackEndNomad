import { Request, Response } from "express"
import { orderService } from "../../service/orderService"
import { orderHelper } from "../../helpers/orderHelper"
import { OrderBadRequest } from "../../errors/order/orderBadRequest";
import { shopService } from "../../service/shopService";
import { shopHelper } from "../../helpers/shopHelper";

export class PutOrderController {

    async run(req: Request, res: Response): Promise<Response> {

        try {
            const id = req.params.id
            if (!id) {
                return res.status(400).json({
                    ok: false,
                    message: "Param 'id' is required"
                });
            }

            const state = req.body.state
            const userId = res.locals.userId as string

            const service = new orderService(new orderHelper())
            const orderObj = await service.findOrderById(id)

            // Check ownership
            const sService = new shopService(new shopHelper())
            const shop = await sService.findShopById(orderObj.shopId)
            
            if (shop.ownerId !== userId && res.locals.userOwner !== "ADMIN") {
                return res.status(403).json({
                    ok: false,
                    message: "Forbidden: You are not the owner of the shop for this order"
                })
            }

            if (state) {
                await service.updateOrderState(id, state)
            } else {
                await service.pickUpOrder(id)
            }

            return res.status(200).json({
                ok: true,
            })
        } catch (e) {
            if (e instanceof OrderBadRequest) return res.status(400).send()
            return res.status(500).json({
            })
        }
    }

}