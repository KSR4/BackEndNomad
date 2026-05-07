import { Response, Request } from "express"
import { dishService } from "../../service/dishService"
import { dishHelper } from "../../helpers/dishHelper"
import { DishBadRequest } from "../../errors/dish/dishBadRequest"
import { DishNotFound } from "../../errors/dish/dishNotFound"

export class PutDishController {
    async run(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id as string
            const { name, description, price, available, stock } = req.body
            const userId = res.locals.userId as string
            const isAdmin = res.locals.userOwner === "ADMIN"

            const service = new dishService(new dishHelper())
            await service.updateFull(id, name, description, price, available, stock, userId, isAdmin)

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