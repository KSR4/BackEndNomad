import { v4 as uuidv4 } from "uuid";
import { dishHelper } from "../helpers/dishHelper";
import { Dish } from "../entities/dish";
import { dishCreateFailed } from "../errors/dish/dishCreateFailed";
import { DishNotFound } from "../errors/dish/dishNotFound";
import { EmptyDishList } from "../errors/dish/dishEmptyList";
import { Shop } from "../entities/shop";
import { orderHelper } from "../helpers/orderHelper";
import { orderService } from "./orderService";
import { DishBadRequest } from "../errors/dish/dishBadRequest";
import { shopService } from "./shopService";
import { shopHelper } from "../helpers/shopHelper";

export class dishService {

    constructor(private readonly helper: dishHelper) { }

    async findDishById(id: string): Promise<Dish> {

        const dish = await this.helper.findDishById(id)

        if (!dish) {
            throw new DishNotFound(`The user with id ${id} can't be reach`)
        }
        return dish
    }

    async create(shopId: string, name: string, description: string, price: number, available: boolean, stock: number) {
        if (!shopId || !name || !description || price === undefined || available === undefined || stock === undefined) {
            throw new DishBadRequest(`The params cannot be null or undefined`);
        }

        const dish = new Dish(uuidv4(), shopId, name, description, price, available, stock);
        try {
            await this.helper.create(dish);
        } catch (e) {
            throw new dishCreateFailed(`The dish with id: ${dish.id} can't be reach`);
        }
    }

    async update(id: string, available: boolean): Promise<Dish> {
        if (!id || available === undefined) {
            throw new DishBadRequest(`The params cannot be null or undefined`);
        }
        const dish = await this.helper.findDishById(id);

        if (!dish) {
            throw new DishNotFound(`The dish with id: ${id} can't be reach`);
        }


        if (!available && dish.available) {
            await this.handleDishUnavailable(id, dish.shopId, dish.name);
        }

        const dishUpdated = dish.update(available);

        try {
            await this.helper.create(dishUpdated);
        } catch (e) {
            throw new dishCreateFailed(`The dish with id: ${dishUpdated.id} couldn't be created`);
        }

        return dishUpdated;
    }

    async updateFull(id: string, name: string, description: string, price: number, available: boolean, stock: number, userId: string, isAdmin: boolean): Promise<Dish> {
        const dish = await this.findDishById(id)

        const sService = new shopService(new shopHelper())
        const shop = await sService.findShopById(dish.shopId)

        if (shop.ownerId !== userId && !isAdmin) {
            throw new DishBadRequest("Forbidden: You are not the owner of the shop for this dish")
        }

        if (!available && dish.available) {
            await this.handleDishUnavailable(id, dish.shopId, dish.name);
        }

        const dishUpdated = dish.updateFull(name, description, price, available, stock)
        await this.helper.create(dishUpdated)
        return dishUpdated
    }

    async handleDishUnavailable(dishId: string, shopId: string, dishName: string): Promise<void> {
        if (!dishId || !shopId || !dishName) {
            throw new DishBadRequest(`The params cannot be null or undefined`);
        }
        const oHelper = new orderHelper();
        const oService = new orderService(oHelper);

        const affectedOrders = await oHelper.findPendingOrdersByDishId(dishId);

        if (affectedOrders.length === 0) {
            return;
        }

        const alternativeDishes = await this.helper.findDishesByShopId(shopId);
        const availableAlternatives = alternativeDishes?.filter(d => d.available && d.id !== dishId) || [];

        let changeReason = `ORDER CHANGE!\n\n`;
        changeReason += `The dish: "${dishName}" is no longer available.\n\n`;

        if (availableAlternatives.length > 0) {
            changeReason += `AVAILABLE OPTIONS:\n`;
            availableAlternatives.forEach(alt => {
                changeReason += `${alt.name} - ${alt.price.toFixed(2)}€\n`;
            });
            changeReason += `\nContact with the foodtruck!.`;
        } else {
            changeReason += `We are sorry, there is no more options.\n`;
            changeReason += `Contact with the foodtruck for more info!.`;
        }

        for (const order of affectedOrders) {
            await oService.update(order.id, "MODIFIED", order.dishes, changeReason);
        }
    }

    async findDishesByShopId(id: string): Promise<Dish[] | null> {

        const dishes = await this.helper.findDishesByShopId(id)
        if (dishes === null) {
            throw new EmptyDishList('The shop has no dishes!')
        }
        return dishes
    }

    async findDishesByShopsId(shops: Shop[]): Promise<Dish[]> {
        if (!shops) {
            throw new DishBadRequest(`The params cannot be null or undefined`);
        }
        const platos: Dish[] = []

        for (const shop of shops) {
            const platosShop = await this.helper.findDishesByShopId(shop.id)

            if (platosShop && platosShop.length > 0) {
                platos.push(...platosShop)
            }
        }

        if (platos.length === 0) {
            throw new EmptyDishList("The shop has no dishes!")
        }

        return platos
    }

    async updateStock(id: string, quantity: number): Promise<Dish> {
        const dish = await this.findDishById(id)

        const newStock = dish.stock + quantity
        if (newStock < 0) {
            throw new DishBadRequest(`Insufficient stock for dish: ${dish.name}`)
        }

        const dishUpdated = dish.updateFull(dish.name, dish.description, dish.price, dish.available, newStock)
        await this.helper.create(dishUpdated)
        return dishUpdated
    }

    async findSoldOutDishes(dishes: Dish[]): Promise<Dish[]> {
        if (!dishes) {
            throw new DishBadRequest(`The params cannot be null or undefined`);
        }
        const soldOutDishes: Dish[] = []

        for (const dish of dishes) {
            if (dish.available === false) {
                soldOutDishes.push(dish)
            }
        }

        if (soldOutDishes.length === 0) {
            throw new EmptyDishList("There is no dishes not available!")
        }

        return soldOutDishes
    }

    async delete(id: string): Promise<void> {
        const dish = await this.findDishById(id)
        await this.helper.delete(dish.id)
    }

}