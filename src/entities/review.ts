import { Entity } from "./entity"


export class Review implements Entity {
    constructor(
        readonly id: string,
        readonly userId: string,
        readonly orderId: string,
        readonly shopId: string,
        readonly text: string,
        readonly date: string
    ) {}

    getPrimitive () {
        return {
            id: this.id,
            userId: this.userId,
            orderId: this.orderId,
            shopId: this.shopId,
            text: this.text,
            date: this.date
        }
    }

    static create (id: string, userId: string, orderId: string, shopId: string, text: string, date: string): Review {
        return new Review(id, userId, orderId, shopId, text, date)
    }


}

