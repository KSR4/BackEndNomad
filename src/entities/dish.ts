import { Entity } from "./entity"


export class Dish implements Entity {
    constructor(
        readonly id: string,
        readonly shopId: string,
        readonly name: string,
        readonly description: string,
        readonly price: number,
        readonly available: boolean,
        readonly stock: number
    ) {}

    getPrimitive () {
        return {
            id: this.id,
            shopId: this.shopId,
            name: this.name,
            description: this.description,
            price: this.price,
            available: this.available,
            stock: this.stock
        }
    }

    static create (id: string, shopId: string, name: string, description: string, price: number, available: boolean, stock: number): Dish {
        return new Dish(id, shopId, name, description, price, available, stock)
    }

    update (available: boolean): Dish {
        return new Dish(
            this.id,
            this.shopId,
            this.name,
            this.description,
            this.price,
            available, 
            this.stock
        )
    }

    updateFull(name: string, description: string, price: number, available: boolean, stock: number): Dish {
        return new Dish(
            this.id,
            this.shopId,
            name,
            description,
            price,
            available,
            stock
        )
    }
}
