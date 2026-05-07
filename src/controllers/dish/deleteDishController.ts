import { Response, Request } from "express"
import { dishService } from "../../service/dishService"
import { dishHelper } from "../../helpers/dishHelper"
import { shopService } from "../../service/shopService"
import { shopHelper } from "../../helpers/shopHelper"
import { DishBadRequest } from "../../errors/dish/dishBadRequest"
import { DishNotFound } from "../../errors/dish/dishNotFound"

export class DeleteDishController {
    async run(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id as string
            const userId = res.locals.userId as string
            const isAdmin = res.locals.userOwner === "ADMIN"

            const dService = new dishService(new dishHelper())
            const dish = await dService.findDishById(id)

            const sService = new shopService(new shopHelper())
            const shop = await sService.findShopById(dish.shopId)

            if (shop.ownerId !== userId && !isAdmin) {
                return res.status(403).json({ ok: false, message: "Forbidden: You are not the owner of the shop for this dish" })
            }

            await dService.delete(id)

            return res.status(200).json({
                ok: true,
            })
        } catch (e) {
            if (e instanceof DishBadRequest) return res.status(400).json({ ok: false, message: e.message })
            if (e instanceof DishNotFound) return res.status(404).json({ ok: false, message: e.message })
            return res.status(500).json({ ok: false, message: "Internal server error" })
        }
    }
}
