import { Entity } from "./entity"

export class LocationLog implements Entity {
    constructor(
        readonly id: string,
        readonly userId: string,
        readonly latitude: number,
        readonly longitude: number,
        readonly createdAt: Date 
    ) {}

    getPrimitive () {
        return {
            id: this.id,
            userID: this.userId,
            lat: this.latitude,
            long: this.longitude,
            createdAt: this.createdAt
        }
    }

    static create (id: string, userId: string, latitude: number, longitude: number): LocationLog {
        return new LocationLog(id, userId, latitude, longitude , new Date())
    }

}