import type { Request, Response } from "express"
import { ticketService } from "../../service/ticketService"
import { ticketHelper } from "../../helpers/ticket.helper"
import { TicketNotFound } from "../../errors/ticket/ticketNotFound"

export class GetTicketController {

    async run(req: Request, res: Response): Promise<Response> {
        try {

            const id = req.params.id
            if (!id) {
                return res.status(400).json({
                    ok: false,
                    message: "Param 'id' is required"
                });
            }

            const service = new ticketService(new ticketHelper())
            const username = await service.findUserNameByTicketId(id)

            return res.status(200).json({
                ok: true,
                data: username
            })
        } catch (e) {
            if (e instanceof TicketNotFound) return res.status(404).send()

            return res.status(500).send()
        }
    }

}