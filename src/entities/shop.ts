import { Entity } from "./entity"

export enum States {
    AVAILABLE = "OPEN",
    NOT_AVAILABLE = "CLOSED"
}
export class Shop implements Entity {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly ownerId: string,
        readonly state: States,
        readonly openDate: Date | null,
        readonly closeDate: Date | null,
        readonly latitude: number,
        readonly longitude: number
    ) { }

    getPrimitive() {
        return {
            id: this.id,
            name: this.name,
            ownerId: this.ownerId,
            state: this.state,
            openDate: this.openDate,
            closeDate: this.closeDate,
            latitude: this.latitude,
            longitude: this.longitude
        }
    }

    static create(id: string, name: string, ownerId: string, latitude: number, longitude: number): Shop {
        return new Shop(id, name, ownerId, States.NOT_AVAILABLE, null, null, latitude, longitude)
    }

    updateState(state: States): Shop {
        return new Shop(
            this.id,
            this.name,
            this.ownerId,
            state,
            this.openDate,
            this.closeDate,
            this.latitude,
            this.longitude
        )
    }

    updateLocation(latitude: number, longitude: number): Shop {
        return new Shop(
            this.id,
            this.name,
            this.ownerId,
            this.state,
            this.openDate,
            this.closeDate,
            latitude,
            longitude
        )
    }

    update(name: string, state: States, latitude: number, longitude: number, openDate: Date | null, closeDate: Date | null): Shop {
        return new Shop(
            this.id,
            name,
            this.ownerId,
            state,
            openDate,
            closeDate,
            latitude,
            longitude
        )
    }

    updateSchedule(openDate: Date | null, closeDate: Date | null): Shop {
        return new Shop(
            this.id,
            this.name,
            this.ownerId,
            this.state,
            openDate,
            closeDate,
            this.latitude,
            this.longitude
        )
    }

}