import { Helper } from "./helper";
import { EntitySchema } from "typeorm";
import { OrderDish } from "../entities/orderDish";
import { OrderDishModel } from "../model/orderDish.model";


export class orderDishHelper extends Helper<OrderDish> {
    
    getEntitySchema(): EntitySchema<OrderDish> {
        return OrderDishModel
    }

    async create(order: OrderDish) {
        return (await this.getRepository()).save(order)
    }
    
    async findOrderByDishId(dishId: string): Promise<OrderDish[] | null> {
            return (await this.getRepository()).findBy({ dishId })
    }

    async findOrderDishesByOrderId(orderId: string): Promise<OrderDish[] | null> {
        return (await this.getRepository()).findBy({ orderId })
    }
   
}