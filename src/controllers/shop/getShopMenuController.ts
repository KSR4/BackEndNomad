import type { Request, Response } from "express"
import { dishService } from "../../service/dishService"
import { dishHelper } from "../../helpers/dishHelper"
import { EmptyDishList } from "../../errors/dish/dishEmptyList"
import { Dish } from "../../entities/dish"
import { shopService } from "../../service/shopService"
import { shopHelper } from "../../helpers/shopHelper"
import { ShopNotFound } from "../../errors/shop/shopNotFound"

type GetShopResponse = {
    shop: string,
    dishes: Dish[] | null;
};

export class GetShopMenuController {
    async run(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({
                    ok: false,
                    message: "Param 'id' is required"
                });
            }

            const dishservice = new dishService(new dishHelper());
            const shopServiceI = new shopService(new shopHelper());

            const shop = await shopServiceI.findShopById(id);
            const dishes = await dishservice.findDishesByShopId(id);

            const response: GetShopResponse = {
                shop: shop.name,
                dishes
            };

            return res.status(200).json({
                ok: true,
                data: response
            });
        } catch (e) {
            if (e instanceof EmptyDishList) {
                return res.status(404).send()
            } else if (e instanceof ShopNotFound) {
                return res.status(404).send()
            }

            return res.status(500).send();
        }
    }
}
