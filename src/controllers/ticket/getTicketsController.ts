import type { Request, Response } from "express"
import { TicketNotFound } from "../../errors/ticket/ticketNotFound"
import { ticketService } from "../../service/ticketService"
import { ticketHelper } from "../../helpers/ticket.helper"

export class GetTicketsController {

    async run(req: Request, res: Response): Promise<Response> {
        try {

            const service = new ticketService(new ticketHelper())
            const tickets = await service.findAllWithUserInfo()

            return res.status(200).json({
                ok: true,
                data: tickets
            })
        } catch (e) {
            if (e instanceof TicketNotFound) return res.status(404).send()

            return res.status(500).send()
        }
    }

}