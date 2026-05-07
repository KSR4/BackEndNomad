import { Helper } from "./helper";
import { EntitySchema } from "typeorm";
import { Shop } from "../entities/shop";
import { ShopModel } from "../model/shop.model";


export class shopHelper extends Helper<Shop> {
    
    getEntitySchema(): EntitySchema<Shop> {
        return ShopModel
    }

    async findShopById (id: string): Promise<Shop | null> {
        return (await this.getRepository()).findOneBy({id})
    }

    async findAll(): Promise<Shop[] | null> {
        return (await this.getRepository()).find()
    }

    async create(shop: Shop) {
            return (await this.getRepository()).save(shop)
    }

    async findShopsByOwnerId(ownerId: string): Promise<Shop[]> {
        return (await this.getRepository()).findBy({ ownerId });
    }
}