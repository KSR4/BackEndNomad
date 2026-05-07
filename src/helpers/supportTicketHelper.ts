import { Helper } from "./helper";
import { EntitySchema } from "typeorm";
import { SupportTicket } from "../entities/supportTicket";
import { SupportTicketModel } from "../model/supportTicket.model";

export class supportTicketHelper extends Helper<SupportTicket> {

    getEntitySchema(): EntitySchema<SupportTicket> {
        return SupportTicketModel
    }

    async findById(id: string): Promise<SupportTicket | null> {
        return (await this.getRepository()).findOneBy({ id })
    }

    async findAll(): Promise<SupportTicket[]> {
        return (await this.getRepository()).find({
            order: { createdAt: "DESC" }
        })
    }

    async findByUserId(userId: string): Promise<SupportTicket[]> {
        return (await this.getRepository()).find({
            where: { userId },
            order: { createdAt: "DESC" }
        })
    }

    async save(supportTicket: SupportTicket) {
        return (await this.getRepository()).save(supportTicket)
    }
}
