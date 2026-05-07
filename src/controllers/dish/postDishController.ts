import type { Request, Response } from "express"
import { dishService } from "../../service/dishService"
import { dishHelper } from "../../helpers/dishHelper"
import { DishBadRequest } from "../../errors/dish/dishBadRequest"

export class PostDishController {

    async run(req: Request, res: Response): Promise<Response> {
        try {

            const service = new dishService(new dishHelper())
            await service.create(req.body.shopId, req.body.name, req.body.description, req.body.price, req.body.available, req.body.stock)

            return res.status(200).json({
                ok: true,
            })
        } catch (e) {
            if (e instanceof DishBadRequest) return res.status(400).send()
            return res.status(500).send()
        }
    }

}