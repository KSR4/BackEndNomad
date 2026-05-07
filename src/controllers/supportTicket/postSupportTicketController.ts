import { Request, Response } from "express"
import { supportTicketService } from "../../service/supportTicketService"
import { supportTicketHelper } from "../../helpers/supportTicketHelper"
import { SupportTicketBadRequest } from "../../errors/supportTicket/supportTicketBadRequest"

export class PostSupportTicketController {
    async run(req: Request, res: Response): Promise<Response> {
        try {
            const userId = res.locals.userId
            const { subject, description } = req.body

            if (!subject || !description) {
                return res.status(400).json({ ok: false, message: "subject and description are required" })
            }

            const service = new supportTicketService(new supportTicketHelper())
            await service.create(userId, subject, description)

            return res.status(201).json({ ok: true })
        } catch (e) {
            if (e instanceof SupportTicketBadRequest) return res.status(400).json({ ok: false, message: e.message })
            return res.status(500).send()
        }
    }
}
