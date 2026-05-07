import { Request, Response } from "express"
import { supportTicketService } from "../../service/supportTicketService"
import { supportTicketHelper } from "../../helpers/supportTicketHelper"
import { SupportTicketBadRequest } from "../../errors/supportTicket/supportTicketBadRequest"
import { SupportTicketNotFound } from "../../errors/supportTicket/supportTicketNotFound"

export class PatchSupportTicketStatusController {
    async run(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            const { status } = req.body

            if (!id) {
                return res.status(400).json({ ok: false, message: "Ticket id is required" })
            }

            if (!status) {
                return res.status(400).json({ ok: false, message: "status is required" })
            }

            const service = new supportTicketService(new supportTicketHelper())
            await service.updateStatus(id, status)

            return res.status(200).json({ ok: true })
        } catch (e) {
            if (e instanceof SupportTicketBadRequest) return res.status(400).json({ ok: false, message: e.message })
            if (e instanceof SupportTicketNotFound) return res.status(404).json({ ok: false, message: e.message })
            return res.status(500).send()
        }
    }
}
