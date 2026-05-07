import { Entity } from "./entity"

export class Ticket implements Entity {
    constructor(
        readonly id: string,
        readonly userId: string,
        readonly shopName: string,
        readonly message: string,
        readonly accepted: boolean,
        readonly createdAt: Date,
        readonly latitude: number,
        readonly longitude: number
    ) { }

    getPrimitive() {
        return {
            id: this.id,
            userID: this.userId,
            shopName: this.shopName,
            message: this.message,
            accepted: this.accepted,
            latitude: this.latitude,
            longitude: this.longitude
        }
    }

    static create(id: string, userId: string, shopName: string, message: string, latitude: number, longitude: number): Ticket {
        return new Ticket(id, userId, shopName, message, false, new Date(), latitude, longitude)
    }

    updateAccepted(accepted: boolean): Ticket {
        return new Ticket(this.id, this.userId, this.shopName, this.message, accepted, this.createdAt, this.latitude, this.longitude)
    }
}