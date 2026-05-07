import { Entity } from "./entity"

export enum orderState {
    PENDING = "PENDING",
    CANCELLED = "CANCELLED",
    CONFIRMED = "CONFIRMED",
    PREPARING = "PREPARING",
    READY = "READY",
    DELIVERED = "DELIVERED"
}

export class Order implements Entity {
    constructor(
        readonly id: string,
        readonly userId: string,
        readonly shopId: string,
        readonly eventId: string | null,
        readonly pickUpDate: string,
        readonly state: string,
        readonly dishes: {
            dishId: string,
            quantity: number
        }[],
        readonly changeReason: string
    ) { }

    getPrimitive() {
        return {
            id: this.id,
            userId: this.userId,
            shopId: this.shopId,
            eventId: this.eventId,
            pickUpDate: this.pickUpDate,
            state: this.state,
            dishes: this.dishes,
            changeReason: this.changeReason
        }
    }

    static create(id: string, userId: string, shopId: string, pickUpDate: string, state: string, dishes: { dishId: string, quantity: number }[], changeReason: string): Order {
        return new Order(id, userId, shopId, null, pickUpDate, state, dishes, changeReason)
    }

    update(state: string, dishes: { dishId: string, quantity: number }[], changeReason: string): Order {
        return new Order(
            this.id,
            this.userId,
            this.shopId,
            this.eventId,
            this.pickUpDate,
            state,
            dishes,
            changeReason
        )
    }

    pickUpOrder(): Order {
        return new Order(
            this.id,
            this.userId,
            this.shopId,
            this.eventId,
            this.pickUpDate,
            "DELIVERED",
            this.dishes,
            this.changeReason
        )
    }
}

