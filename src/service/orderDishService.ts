
import { v4 as uuidv4 } from "uuid";
import { OrderCreateFailed } from "../errors/order/orderCreateFailed";
import { OrderDish } from "../entities/orderDish";
import { orderDishHelper } from "../helpers/orderDishHelper";
import { OrderNotFound } from "../errors/order/orderNotFound";
import { Dish } from "../entities/dish";

export class orderDishService {

    constructor(private readonly helper: orderDishHelper) { }

    async create(orderId: string, dishId: string, quantity: number, unitaryPrice: number) {
        const orderDish = new OrderDish(uuidv4(), orderId, dishId, quantity, unitaryPrice);
        try {
            await this.helper.create(orderDish);
        } catch (e) {
            throw new OrderCreateFailed(`The orderDish with id: ${orderDish.id} can't be reach`);
        }
    }

    async findOrderByDishId(dishId: string): Promise<OrderDish[] | null> {

        const orders = await this.helper.findOrderByDishId(dishId)
        if (orders === null) {
            throw new OrderNotFound('The dish has no orders!')
        }
        return orders
    }

    async findDishesByOrderId(orderId: string): Promise<OrderDish[]> {
        const orderDishes = await this.helper.findOrderDishesByOrderId(orderId)
        if (!orderDishes) {
            return [];
        }
        return orderDishes;
    }

    async reservedDishes(dishes: Dish[]): Promise<number | null> {
        const orders: OrderDish[] = []

        for (const dish of dishes) {
            const ordersDish = await this.helper.findOrderByDishId(dish.id)

            if (ordersDish && ordersDish.length > 0) {
                orders.push(...ordersDish)
            }
        }

        if (orders.length === 0) {
            throw new OrderNotFound("The dish has no orders!")
        }

        const ordersCount = orders.length
        return ordersCount
    }

}
