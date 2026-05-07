import { v4 as uuidv4 } from "uuid";
import { eventHelper } from "../helpers/eventHelper";
import { Event } from "../entities/event";
import { EventNotFound } from "../errors/event/eventNotFound";
import { EventBadRequest } from "../errors/event/eventBadRequest";

export class eventService {

    constructor(private readonly helper: eventHelper) { }

    async findEventById(id: string): Promise<Event> {

        const event = await this.helper.findEventById(id)

        if (!event) {
            throw new EventNotFound(`The event with id ${id} can't be reach`)
        }
        return event
    }

    async findAll(): Promise<Event[]> {

        const events = await this.helper.findAll()

        if (events == null) {
            throw new EventNotFound(`There's no events`)
        }

        return events
    }

    async create(name: string, description: string, location: string, latitude: number, longitude: number, startDate: string, finishDate: string) {
        if (!name || !description || !location || latitude === undefined || longitude === undefined || !startDate || !finishDate) {
            throw new EventBadRequest("All parameters are required");
        }
        const event = Event.create(uuidv4(), name, description, location, latitude, longitude, startDate, finishDate);
        await this.helper.save(event);
        return event;
    }

    async update(id: string, name: string, description: string, location: string, latitude: number, longitude: number, startDate: string, finishDate: string) {
        const event = await this.findEventById(id);
        const eventUpdated = event.update(name, description, location, latitude, longitude, startDate, finishDate);
        await this.helper.save(eventUpdated);
        return eventUpdated;
    }

    async delete(id: string) {
        if (!id) {
            throw new EventBadRequest("Id is required");
        }
        await this.helper.delete(id);
    }

}