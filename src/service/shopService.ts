
import { shopHelper } from "../helpers/shopHelper";
import { Shop, States } from "../entities/shop";
import { ShopNotFound } from "../errors/shop/shopNotFound";
import { v4 as uuidv4 } from "uuid";
import { ShopBadRequest } from "../errors/shop/shopBadRequest";
import { shopEventHelper } from "../helpers/shopEventHelper";
import { logService } from "./logService";
import { LogLevel } from "../entities/log";

export class shopService {

    constructor ( 
        private readonly helper: shopHelper, 
        private readonly sEHelper?: shopEventHelper,
        private readonly logger: logService = new logService()
    ) {}

    async findShopById (id: string): Promise<Shop> {

        const shop = await this.helper.findShopById(id)

        if (!shop) {
            throw new ShopNotFound(`The shop with id ${id} can't be reach`)
        }
        return shop
    }

    async findAll(): Promise<Shop[]> {

        const shops = await this.helper.findAll()

        if (shops == null) {
            throw new ShopNotFound(`There's no shops`)
        }

        return shops
    }

    async create(shopName: string, ownerId: string, latitude: number, longitude: number ) {
            if (!shopName || !ownerId || !latitude || !longitude) {
                throw new ShopBadRequest("All parameters are required");
            }
    
            const shop = Shop.create(uuidv4(), shopName, ownerId, latitude, longitude); 
            await this.helper.create(shop);
            await this.logger.info(`New shop created: ${shopName}`, { shopId: shop.id, ownerId });
    }

    async findShopsByOwnerId(ownerId: string): Promise<Shop[]> {
        return this.helper.findShopsByOwnerId(ownerId);
    }

    async update(id: string, name: string, state: States, latitude: number, longitude: number, openDate: Date | null, closeDate: Date | null, userId: string, isAdmin: boolean) {
        const shop = await this.findShopById(id)

        if (shop.ownerId !== userId && !isAdmin) {
            throw new ShopBadRequest("Forbidden: You are not the owner of this shop")
        }

        const shopUpdated = shop.update(name, state, latitude, longitude, openDate, closeDate)
        await this.helper.create(shopUpdated)
        return shopUpdated
    }

    async findShopsByEventId(eventId: string): Promise<Shop[]> {
        if (!this.sEHelper) throw new Error("shopEventHelper not provided")
        
        const shopEvents = await this.sEHelper.findShopsByEventId(eventId)
        if (!shopEvents) return []

        const shops: Shop[] = []
        for (const se of shopEvents) {
            const shop = await this.helper.findShopById(se.shopId)
            if (shop) shops.push(shop)
        }
        return shops
    }

    async updateName(id: string, name: string, userId: string, isAdmin: boolean) {
        const shop = await this.findShopById(id)

        if (shop.ownerId !== userId && !isAdmin) {
            throw new ShopBadRequest("Forbidden: You are not the owner of this shop")
        }

        const shopUpdated = shop.update(name, shop.state, shop.latitude, shop.longitude, shop.openDate, shop.closeDate)
        await this.helper.create(shopUpdated)
        return shopUpdated
    }

    async updateState(id: string, state: States, userId: string, isAdmin: boolean) {
        const shop = await this.findShopById(id)

        if (shop.ownerId !== userId && !isAdmin) {
            throw new ShopBadRequest("Forbidden: You are not the owner of this shop")
        }

        const shopUpdated = shop.updateState(state)
        await this.helper.create(shopUpdated)
        await this.logger.info(`Shop ${id} state updated to: ${state}`, { shopId: id, state });
        return shopUpdated
    }

    async updateLocation(id: string, latitude: number, longitude: number, userId: string, isAdmin: boolean) {
        const shop = await this.findShopById(id)

        if (shop.ownerId !== userId && !isAdmin) {
            throw new ShopBadRequest("Forbidden: You are not the owner of this shop")
        }

        const shopUpdated = shop.updateLocation(latitude, longitude)
        await this.helper.create(shopUpdated)
        return shopUpdated
    }

    async updateSchedule(id: string, openDate: Date | null, closeDate: Date | null, userId: string, isAdmin: boolean) {
        const shop = await this.findShopById(id)

        if (shop.ownerId !== userId && !isAdmin) {
            throw new ShopBadRequest("Forbidden: You are not the owner of this shop")
        }

        const shopUpdated = shop.updateSchedule(openDate, closeDate)
        await this.helper.create(shopUpdated)
        return shopUpdated
    }
    
}