import { Entity } from "./entity"


export class Event implements Entity {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly description: string,
        readonly location: string,
        readonly latitude: number,
        readonly longitude: number,
        readonly startDate: string,
        readonly finishDate: string
    ) {}

    getPrimitive () {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            location: this.location,
            latitude: this.latitude,
            longitude: this.longitude,
            start: this.startDate,
            finish: this.finishDate
        }
    }

    static create (id: string, name: string, description: string, location: string, latitude: number, longitude: number, startDate: string, finishDate: string): Event {
        return new Event(id, name, description, location, latitude, longitude, startDate, finishDate)
    }

    update (name: string, description: string, location: string, latitude: number, longitude: number, startDate: string, finishDate: string): Event {
        return new Event(this.id, name, description, location, latitude, longitude, startDate, finishDate)
    }

}