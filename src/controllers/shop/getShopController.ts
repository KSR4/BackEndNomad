import type { Request, Response } from "express"
import { shopHelper } from "../../helpers/shopHelper"
import { shopService } from "../../service/shopService"
import { ShopNotFound } from "../../errors/shop/shopNotFound"

export class GetShopController {

    async run(req: Request, res: Response): Promise<Response> {
        try {

            const id = req.params.id
            if (!id) {
                return res.status(400).json({
                    ok: false,
                    message: "Param 'id' is required"
                });
            }

            const service = new shopService(new shopHelper())
            const shop = await service.findShopById(id)

            return res.status(200).json({
                ok: true,
                data: shop
            })
        } catch (e) {
            if (e instanceof ShopNotFound) return res.status(404).send()

            return res.status(500).send()
        }
    }

}