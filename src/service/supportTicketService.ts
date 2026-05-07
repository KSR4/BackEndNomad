import { v4 as uuidv4 } from "uuid";
import { supportTicketHelper } from "../helpers/supportTicketHelper";
import { SupportTicket, SupportTicketStatus } from "../entities/supportTicket";
import { SupportTicketNotFound } from "../errors/supportTicket/supportTicketNotFound";
import { SupportTicketBadRequest } from "../errors/supportTicket/supportTicketBadRequest";
import { userService } from "./userService";
import { userHelper } from "../helpers/userHelper";

export class supportTicketService {

    constructor(private readonly helper: supportTicketHelper) {}

    async create(userId: string, subject: string, description: string): Promise<void> {
        if (!userId || !subject || !description) {
            throw new SupportTicketBadRequest("userId, subject and description are required")
        }

        const ticket = SupportTicket.create(uuidv4(), userId, subject, description)
        await this.helper.save(ticket)
    }

    async findAll(): Promise<any[]> {
        const tickets = await this.helper.findAll()
        const userSrv = new userService(new userHelper())

        const enriched = await Promise.all(tickets.map(async (ticket) => {
            const user = await userSrv.findUserById(ticket.userId)
            return {
                ...ticket.getPrimitive(),
                username: user.username,
                avatar: user.avatar
            }
        }))

        return enriched
    }

    async findByUserId(userId: string): Promise<SupportTicket[]> {
        return this.helper.findByUserId(userId)
    }

    async updateStatus(id: string, status: string): Promise<void> {
        const validStatuses = Object.values(SupportTicketStatus)

        if (!validStatuses.includes(status as SupportTicketStatus)) {
            throw new SupportTicketBadRequest(`Status must be one of: ${validStatuses.join(", ")}`)
        }

        const ticket = await this.helper.findById(id)

        if (!ticket) {
            throw new SupportTicketNotFound(`Support ticket with id ${id} not found`)
        }

        const updated = ticket.updateStatus(status as SupportTicketStatus)
        await this.helper.save(updated)
    }
}
