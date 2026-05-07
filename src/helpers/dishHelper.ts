import { Helper } from "./helper";
import { EntitySchema } from "typeorm";
import { Dish } from "../entities/dish";
import { DishModel } from "../model/dish.model";


export class dishHelper extends Helper<Dish> {
    
    getEntitySchema(): EntitySchema<Dish> {
        return DishModel
    }

    async findDishById (id: string): Promise<Dish | null> {
        return (await this.getRepository()).findOneBy({id})
    }

    async findDishesByShopId(shopId: string): Promise<Dish[] | null> {
        return (await this.getRepository()).findBy({ shopId })
    }

    async create(dish: Dish) {
        return (await this.getRepository()).save(dish)
    }

    async delete(id: string) {
        return (await this.getRepository()).delete(id)
    }
}