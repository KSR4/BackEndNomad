import type { Request, Response } from "express"

import { eventService } from "../../service/eventService"
import { eventHelper } from "../../helpers/eventHelper"
import { EventNotFound } from "../../errors/event/eventNotFound"
import { Dish } from "../../entities/dish";
import { Event } from "../../entities/event";
import { shopEventService } from "../../service/shopEventService";
import { shopEventHelper } from "../../helpers/shopEventHelper";
import { orderDishService } from "../../service/orderDishService";
import { orderDishHelper } from "../../helpers/orderDishHelper";
import { dishService } from "../../service/dishService";
import { dishHelper } from "../../helpers/dishHelper";
import { EmptyDishList } from "../../errors/dish/dishEmptyList";
import { ShopEventNotFound } from "../../errors/shopEvent/shopEventNotFound";
import { DishBadRequest } from "../../errors/dish/dishBadRequest";
import { OrderNotFound } from "../../errors/order/orderNotFound";
import { ShopNotFound } from "../../errors/shop/shopNotFound";

type GetEventResponse = {
    event: Event,
    shops: {
        shop: any,
        menu: any[]
    }[],
    reservedDishes: number | null,
    soldOutDishes: Dish[]
};

export class GetEventController {

    async run(req: Request, res: Response): Promise<Response> {
        try {

            const id = req.params.id
            if (!id) {
                return res.status(400).json({
                    ok: false,
                    message: "Param 'id' is required"
                });
            }

            const dService = new dishService(new dishHelper())
            const oDService = new orderDishService(new orderDishHelper())
            const sEService = new shopEventService(new shopEventHelper())
            const service = new eventService(new eventHelper())

            const event = await service.findEventById(id)
            
            let shops: any[] = []
            try {
                shops = await sEService.findShopsByEventId(event.id)
            } catch (e) {
                if (!(e instanceof ShopNotFound)) throw e;
            }

            let dishes: Dish[] = []
            if (shops.length > 0) {
                try {
                    dishes = await dService.findDishesByShopsId(shops)
                } catch (e) {
                    if (!(e instanceof EmptyDishList)) throw e;
                }
            }

            let reservedDishes: number | null = 0
            if (dishes.length > 0) {
                try {
                    reservedDishes = await oDService.reservedDishes(dishes)
                } catch (e) {
                    if (!(e instanceof OrderNotFound)) throw e;
                }
            }

            let soldOutDishes: Dish[] = []
            if (dishes.length > 0) {
                try {
                    soldOutDishes = await dService.findSoldOutDishes(dishes)
                } catch (e) {
                    if (!(e instanceof EmptyDishList)) throw e;
                }
            }

            const shopsWithMenus = shops.map(shop => {
                const shopDishes = dishes.filter(d => d.shopId === shop.id).map(d => typeof d.getPrimitive === 'function' ? d.getPrimitive() : d)
                return {
                    shop: typeof shop.getPrimitive === 'function' ? shop.getPrimitive() : shop,
                    menu: shopDishes
                }
            })

            const response: GetEventResponse = {
                event,
                shops: shopsWithMenus,
                reservedDishes,
                soldOutDishes
            };

            return res.status(200).json({
                ok: true,
                data: response
            })
        } catch (e) {
            if (e instanceof EventNotFound) return res.status(404).send()
            if (e instanceof ShopEventNotFound) return res.status(404).send()
            if (e instanceof DishBadRequest) return res.status(400).send()

            return res.status(500).send()
        }
    }

}