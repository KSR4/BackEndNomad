import { Response, Request } from "express"
import { ticketService } from "../../service/ticketService"
import { ticketHelper } from "../../helpers/ticket.helper"
import { TicketBadRequest } from "../../errors/ticket/ticketBadRequest"

export class PostTicketController {
    async run(req: Request, res: Response): Promise<Response> {
        try {

            const userId = res.locals.userId
            const service = new ticketService(new ticketHelper())
            await service.create(userId, req.body.shopName, req.body.message, req.body.latitude, req.body.longitude)

            return res.status(200).json({
                ok: true,
            })
        } catch (e) {
            if (e instanceof TicketBadRequest) return res.status(400).send()
            return res.status(500).send()
        }
    }
}