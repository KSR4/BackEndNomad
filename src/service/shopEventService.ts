
import { EventNotFound } from "../errors/event/eventNotFound";
import { shopEventHelper } from "../helpers/shopEventHelper";
import { ShopEvent } from "../entities/shopEvent";
import { ShopEventNotFound } from "../errors/shopEvent/shopEventNotFound";
import { shopService } from "./shopService";
import { shopHelper } from "../helpers/shopHelper";
import { Shop } from "../entities/shop";
import { orderHelper } from "../helpers/orderHelper";
import { orderService } from "./orderService";
import { eventService } from "./eventService";
import { eventHelper } from "../helpers/eventHelper";
import { ShopNotFound } from "../errors/shop/shopNotFound";
import { v4 as uuidv4 } from "uuid";
import { ShopEventBadRequest } from "../errors/shopEvent/shopEventBadRequest";

export class shopEventService {

    constructor(private readonly helper: shopEventHelper) { }

    async findEventById(id: string): Promise<ShopEvent> {

        const shopEvent = await this.helper.findShopEventById(id)

        if (!shopEvent) {
            throw new EventNotFound(`The Event with id ${id} can't be reach`)
        }
        return shopEvent
    }

    async create(eventId: string, shopId: string, userId: string, isAdmin: boolean): Promise<ShopEvent> {
        if (!eventId || !shopId) {
            throw new ShopEventBadRequest("eventId and shopId are required")
        }

        const sService = new shopService(new shopHelper())
        const foodtruck = await sService.findShopById(shopId)

        if (foodtruck.ownerId !== userId && !isAdmin) {
            throw new ShopEventBadRequest("Forbidden: You are not the owner of this foodtruck")
        }

        const eService = new eventService(new eventHelper())
        const event = await eService.findEventById(eventId)

        // Verificar si la tienda ya está en ANY un evento activo
        const activeShopEvent = await this.helper.findActiveByShopId(shopId)
        if (activeShopEvent) {
            throw new ShopEventBadRequest("The foodtruck is already registered to an active event")
        }

        const newShopEvent = ShopEvent.create(uuidv4(), eventId, shopId, true)
        
        try {
            await this.helper.save(newShopEvent)
        } catch (e) {
            throw new ShopEventBadRequest("Could not save shop event")
        }

        return newShopEvent
    }

    async update(id: string, active: boolean): Promise<ShopEvent> {
        const shopEvent = await this.helper.findShopEventById(id);

        if (!shopEvent) {
            throw new ShopEventNotFound(`The foodtruckEvent with id ${id} can't be reach`);
        }

        if (!active && shopEvent.active) {
            await this.handleFoodtruckWithdrawn(
                shopEvent.shopId,
                shopEvent.eventId
            );
        }

        const shopEventUpdated = shopEvent.update(active);

        try {
            await this.helper.save(shopEventUpdated);
        } catch (e) {
            throw new ShopEventNotFound(`The shopEvent with id ${shopEventUpdated.id} couldn't be found`);
        }

        return shopEventUpdated;
    }

    async unsubscribe(shopId: string, userId: string, isAdmin: boolean): Promise<ShopEvent> {
        const sService = new shopService(new shopHelper())
        const foodtruck = await sService.findShopById(shopId)

        if (foodtruck.ownerId !== userId && !isAdmin) {
            throw new ShopEventBadRequest("Forbidden: You are not the owner of this foodtruck")
        }

        const activeShopEvent = await this.helper.findActiveByShopId(shopId)
        if (!activeShopEvent) {
            throw new ShopEventBadRequest("The foodtruck is not registered to any event")
        }

        // Cancelar pedidos pendientes de esa tienda y evento
        await this.handleFoodtruckWithdrawn(activeShopEvent.shopId, activeShopEvent.eventId)

        // Borrarlo físicamente en vez de update(active = false)
        await this.helper.delete(activeShopEvent.id)
        
        return activeShopEvent;
    }

    async handleFoodtruckWithdrawn(shopId: string, eventId: string): Promise<void> {
        const oHelper = new orderHelper();
        const oService = new orderService(oHelper);
        const sService = new shopService(new shopHelper());
        const eService = new eventService(new eventHelper());

        const affectedOrders = await oHelper.findPendingOrdersByShopAndEvent(shopId, eventId);

        if (affectedOrders.length === 0) {
            return;
        }

        const foodtruck = await sService.findShopById(shopId);
        const event = await eService.findEventById(eventId);

        const alternativeShops = await this.findShopsByEventId(eventId);
        const availableAlternatives = alternativeShops.filter(ft => ft.id !== shopId);

        let changeReason = `ORDER CHANGE!\n\n`;
        changeReason += `The food truck "${foodtruck.name}" is no longer in the event: "${event.name}".\n\n`;

        if (availableAlternatives.length > 0) {
            changeReason += `OTHER SHOPS IN THE EVENT:\n`;
            availableAlternatives.forEach(alt => {
                changeReason += `${alt.name} - ${alt.latitude} - ${alt.longitude}\n`;
            });
            changeReason += `\nMake another order with other shops.`;
        } else {
            changeReason += `There is no other shops in the event.\n`;
            changeReason += `Contact with the administrators of the event for more info.`;
        }

        for (const order of affectedOrders) {
            await oService.update(order.id, "MODIFIED", order.dishes, changeReason);
        }
    }

    async findShopsByEventId(id: string): Promise<Shop[]> {

        const shopServiceI = new shopService(new shopHelper)

        const shopsE = await this.helper.findShopsByEventId(id)
        if (shopsE === null) {
            throw new ShopNotFound('There is no shops with this event Id!')
        }

        const shops: Shop[] = []

        for (const shopEvent of shopsE) {
            const shop = await shopServiceI.findShopById(shopEvent.shopId)
            if (shop) {
                shops.push(shop)
            }
        }

        if (shops === null) {
            throw new ShopNotFound('There is no foodtrucks with this event Id!')
        }

        return shops
    }

    async findAll(): Promise<ShopEvent[]> {

        const shopEvents = await this.helper.findAll()

        if (shopEvents == null) {
            throw new ShopEventNotFound(`There's no foodtrucks asociated with events`)
        }

        return shopEvents
    }


}