import { Helper } from "./helper";
import { EntitySchema } from "typeorm";
import { Order } from "../entities/order";
import { OrderModel } from "../model/order.model";


export class orderHelper extends Helper<Order> {

    getEntitySchema(): EntitySchema<Order> {
        return OrderModel
    }

    async findOrderById(id: string): Promise<Order | null> {
        return (await this.getRepository()).findOneBy({ id })
    }

    async create(order: Order) {
        return (await this.getRepository()).save(order)
    }

    async delete(id: string) {
        return (await this.getRepository()).delete(id)
    }

    async findPendingOrdersByDishId(dishId: string): Promise<Order[]> {
        const repository = await this.getRepository();
        const allOrders = await repository.find();

        const affectedOrders = allOrders.filter(order => {
            return order.state === "PENDING" &&
                order.dishes.some(dish => dish.dishId === dishId);
        });

        return affectedOrders;
    }

    async findPendingOrdersByShopAndEvent(shopId: string, eventId: string): Promise<Order[]> {
        const repository = await this.getRepository();
        const allOrders = await repository.find();

        const affectedOrders = allOrders.filter(order => {
            return order.state === "PENDING" &&
                order.shopId === shopId &&
                order.eventId === eventId;
        });

        return affectedOrders;
    }

    async findOrdersByUserId(userId: string): Promise<Order[]> {
        return (await this.getRepository()).findBy({ userId });
    }

    async findOrdersByShopId(shopId: string): Promise<Order[]> {
        return (await this.getRepository()).findBy({ shopId });
    }

}