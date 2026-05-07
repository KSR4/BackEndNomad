import { Entity } from "./entity"


export class OrderDish implements Entity {
    constructor(
        readonly id: string,
        readonly orderId: string,
        readonly dishId: string,
        readonly quantity: number,
        readonly unitaryPrice: number
    ) {}

    getPrimitive () {
        return {
            id: this.id,
            orderId: this.orderId,
            dishId: this.dishId,
            quantity: this.quantity,
            unitaryPrice: this.unitaryPrice
        }
    }

    static create (id: string, orderId: string, dishId: string, quantity: number, unitaryPrice: number): OrderDish {
        return new OrderDish(id, orderId, dishId, quantity, unitaryPrice)
    }

}