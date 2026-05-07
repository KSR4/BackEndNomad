import { Request, Response } from "express"
import { supportTicketService } from "../../service/supportTicketService"
import { supportTicketHelper } from "../../helpers/supportTicketHelper"

export class GetSelfSupportTicketsController {
    async run(req: Request, res: Response): Promise<Response> {
        try {
            const userId = res.locals.userId
            const service = new supportTicketService(new supportTicketHelper())
            const tickets = await service.findByUserId(userId)

            return res.status(200).json({ ok: true, data: tickets })
        } catch (e) {
            return res.status(500).send()
        }
    }
}
