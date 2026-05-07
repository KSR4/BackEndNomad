import { Response, Request } from "express"
import { reviewService } from "../../service/reviewService"
import { reviewHelper } from "../../helpers/reviewHelper"
import { userService } from "../../service/userService"
import { userHelper } from "../../helpers/userHelper"
import { orderDishService } from "../../service/orderDishService"
import { orderDishHelper } from "../../helpers/orderDishHelper"
import { dishService } from "../../service/dishService"
import { dishHelper } from "../../helpers/dishHelper"

export class GetShopReviewsController {
    async run(req: Request, res: Response): Promise<Response> {
        try {
            const shopId = req.params.id as string

            const service = new reviewService(new reviewHelper())
            const uService = new userService(new userHelper())
            const odService = new orderDishService(new orderDishHelper())
            const dService = new dishService(new dishHelper())

            const reviews = await service.findReviewsByShopId(shopId)

            const detailedReviews = await Promise.all(reviews.map(async review => {
                const user = await uService.findUserById(review.userId)

                const orderDishes = await odService.findDishesByOrderId(review.orderId)
                const dishes = await Promise.all(orderDishes.map(async od => {
                    try {
                        const dish = await dService.findDishById(od.dishId)
                        return {
                            dishId: od.dishId,
                            name: dish.name,
                            quantity: od.quantity,
                            price: od.unitaryPrice
                        }
                    } catch (err: any) {
                        return {
                            dishId: od.dishId,
                            name: "Plato eliminado",
                            quantity: od.quantity,
                            price: od.unitaryPrice
                        }
                    }
                }))

                return {
                    ...review.getPrimitive(),
                    username: user.username,
                    avatar: user.avatar,
                    dishes
                }
            }))

            return res.status(200).json({
                ok: true,
                data: detailedReviews
            })
        } catch (e: any) {
            return res.status(500).json({ ok: false, message: "Internal server error" })
        }
    }
}
