import { Helper } from "./helper";
import { EntitySchema } from "typeorm";
import { Ticket } from "../entities/ticket";
import { TicketModel } from "../model/ticket.model";


export class ticketHelper extends Helper<Ticket> {
    
    getEntitySchema(): EntitySchema<Ticket> {
        return TicketModel
    }

    async findTicketById (id: string): Promise<Ticket | null> {
        return (await this.getRepository()).findOneBy({id})
    }

    async findAll(): Promise<Ticket[] | null> {
        return (await this.getRepository()).find()
    }

    async save(ticket: Ticket) {
        return (await this.getRepository()).save(ticket)
    }


}