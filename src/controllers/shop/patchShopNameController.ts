import { Response, Request } from "express"
import { shopService } from "../../service/shopService"
import { shopHelper } from "../../helpers/shopHelper"
import { ShopBadRequest } from "../../errors/shop/shopBadRequest"
import { ShopNotFound } from "../../errors/shop/shopNotFound"

export class PatchShopNameController {
    async run(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id as string
            const { name } = req.body
            const userId = res.locals.userId as string
            const isAdmin = res.locals.userOwner === "ADMIN"

            if (!name) {
                return res.status(400).json({ ok: false, message: "Name is required" })
            }

            const service = new shopService(new shopHelper())
            await service.updateName(id, name, userId, isAdmin)

            return res.status(200).json({
                ok: true,
            })
        } catch (e) {
            if (e instanceof ShopBadRequest) return res.status(400).json({ ok: false, message: e.message })
            if (e instanceof ShopNotFound) return res.status(404).json({ ok: false, message: e.message })
            return res.status(500).json({ ok: false, message: "Internal server error" })
        }
    }
}
