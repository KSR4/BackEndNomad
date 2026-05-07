import { Response, Request } from "express"
import { shopService } from "../../service/shopService"
import { shopHelper } from "../../helpers/shopHelper"
import { ShopBadRequest } from "../../errors/shop/shopBadRequest"

export class PostShopController {
    async run(req: Request, res: Response): Promise<Response> {
        try {

            const ownerId = req.body.userId ?? res.locals.userId as string
            const service = new shopService(new shopHelper())
            await service.create(req.body.shopName, ownerId, req.body.latitude, req.body.longitude)

            return res.status(200).json({
                ok: true,
            })
        } catch (e) {
            if (e instanceof ShopBadRequest) return res.status(400).send()
            return res.status(500).send()
        }
    }
}