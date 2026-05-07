import { Response, Request } from "express"
import { shopService } from "../../service/shopService"
import { shopHelper } from "../../helpers/shopHelper"

export class GetSelfShopsController {
    async run(req: Request, res: Response): Promise<Response> {
        try {
            const userId = res.locals.userId as string

            const service = new shopService(new shopHelper())
            const shops = await service.findShopsByOwnerId(userId)

            return res.status(200).json({
                ok: true,
                data: shops
            })
        } catch (e) {
            return res.status(500).json({ ok: false, message: "Internal server error" })
        }
    }
}
