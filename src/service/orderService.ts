
import { v4 as uuidv4 } from "uuid";
import { Order } from "../entities/order";
import { orderHelper } from "../helpers/orderHelper";
import { orderDishService } from "./orderDishService";
import { orderDishHelper } from "../helpers/orderDishHelper";
import { dishService } from "./dishService";
import { dishHelper } from "../helpers/dishHelper";
import { DishNotFound } from "../errors/dish/dishNotFound";
import { OrderNotFound } from "../errors/order/orderNotFound";
import { OrderBadRequest } from "../errors/order/orderBadRequest";
import { userService } from "./userService";
import { userHelper } from "../helpers/userHelper";
import { logService } from "./logService";
import { LogLevel } from "../entities/log";

export class orderService {

    constructor(
        private readonly helper: orderHelper,
        private readonly logger: logService = new logService()
    ) { }

    async findOrderById(id: string): Promise<Order> {

        const order = await this.helper.findOrderById(id)

        if (!order) {
            throw new OrderNotFound(`The order with id ${id} can't be reach`)
        }
        return order
    }

    async create(userId: string, foodtruckId: string, pickUpDate: string, dishes: { dishId: string, quantity: number }[]) {
        if (!userId || !foodtruckId || !pickUpDate || !dishes) {
            throw new OrderBadRequest(`The params cannot be null or undefined`);
        }
        const odService = new orderDishService(new orderDishHelper())
        const dService = new dishService(new dishHelper())

        const id = uuidv4()
        const order = new Order(id, userId, foodtruckId, null, pickUpDate, "PENDING", dishes, "");

        // Stock validation (stock is decremented only when order is picked up)
        for (const dish of dishes) {
            const plato = await dService.findDishById(dish.dishId);
            if (!plato) {
                throw new DishNotFound(`The dish with id ${dish.dishId} can't be reached`);
            }
            if (!plato.available) {
                throw new OrderBadRequest(`The dish ${plato.name} is currently not available`);
            }
            if (plato.stock < dish.quantity) {
                throw new OrderBadRequest(`Insufficient stock for dish: ${plato.name}`);
            }
        }

        await this.helper.create(order);
        await this.logger.info(`New order created: ${id}`, { userId, foodtruckId });

        for (const dish of dishes) {
            const plato = await dService.findDishById(dish.dishId);
            await odService.create(
                id,
                dish.dishId,
                dish.quantity,
                plato.price
            );
        }
    }

    async update(id: string, state: string, dishes: { dishId: string, quantity: number }[], changeReason: string): Promise<Order> {
        if (!id || !state || !dishes || !changeReason) {
            throw new OrderBadRequest(`The params cannot be null or undefined`);
        }
        const order = await this.helper.findOrderById(id);

        if (!order) {
            throw new OrderNotFound(`The order with id: ${id} can't be reach`);
        }

        const orderUpdated = order.update(state, dishes, changeReason)

        await this.helper.create(orderUpdated);

        return orderUpdated;
    }

    async pickUpOrder(id: string): Promise<Order> {

        const order = await this.helper.findOrderById(id);

        if (!order) {
            throw new OrderNotFound(`The order with id: ${id} can't be reach`);
        }

        const odService = new orderDishService(new orderDishHelper());
        const dService = new dishService(new dishHelper());
        const orderDishes = await odService.findDishesByOrderId(order.id);

        for (const od of orderDishes) {
            await dService.updateStock(od.dishId, -od.quantity);
        }

        const orderUpdated = order.pickUpOrder()

        await this.helper.create(orderUpdated);
        await this.logger.info(`Order picked up: ${id}`, { orderId: id });

        return orderUpdated;
    }

    async updateOrderState(id: string, state: string): Promise<Order> {
        const order = await this.helper.findOrderById(id);

        if (!order) {
            throw new OrderNotFound(`The order with id: ${id} can't be reach`);
        }

        const orderUpdated = new Order(
            order.id,
            order.userId,
            order.shopId,
            order.eventId,
            order.pickUpDate,
            state,
            order.dishes,
            order.changeReason
        )

        await this.helper.create(orderUpdated);
        await this.logger.info(`Order ${id} state updated to: ${state}`, { orderId: id, state });

        return orderUpdated;
    }

    async findMyOrders(userId: string): Promise<Order[]> {
        return this.helper.findOrdersByUserId(userId);
    }

    async findOrdersByShopId(shopId: string): Promise<Order[]> {
        const orders = await this.helper.findOrdersByShopId(shopId);
        if (!orders || orders.length === 0) {
            throw new OrderNotFound(`No orders found for this shop`);
        }
        return orders;
    }

    async getDetailedOrders(orders: Order[]): Promise<any[]> {
        const odService = new orderDishService(new orderDishHelper());
        const dService = new dishService(new dishHelper());
        const uService = new userService(new userHelper());

        return await Promise.all(orders.map(async order => {
            const orderDishes = await odService.findDishesByOrderId(order.id);

            const dishesDetails = await Promise.all(orderDishes.map(async od => {
                try {
                    const dish = await dService.findDishById(od.dishId);
                    return {
                        dishId: od.dishId,
                        name: dish.name,
                        quantity: od.quantity,
                        price: od.unitaryPrice
                    };
                } catch (e) {
                    if (e instanceof DishNotFound) {
                        return {
                            dishId: od.dishId,
                            name: "Plato eliminado",
                            quantity: od.quantity,
                            price: od.unitaryPrice
                        };
                    }
                    throw e;
                }
            }));

            const totalPrice = dishesDetails.reduce((sum, d) => sum + (d.quantity * d.price), 0);

            let username = "Usuario";
            try {
                const user = await uService.findUserById(order.userId);
                username = user.username;
            } catch (e) {
                
            }

            return {
                ...order.getPrimitive(),
                dishes: dishesDetails,
                totalPrice,
                username
            };
        }));
    }

}