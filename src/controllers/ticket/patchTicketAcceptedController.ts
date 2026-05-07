import { Request, Response } from "express";
import { ticketService } from "../../service/ticketService";
import { ticketHelper } from "../../helpers/ticket.helper";
import { TicketBadRequest } from "../../errors/ticket/ticketBadRequest";
import { TicketNotFound } from "../../errors/ticket/ticketNotFound";

export class PatchTicketAcceptedController {
    async run(req: Request, res: Response): Promise<Response> {
        try {
            const ticketId = req.params.id;
            const accepted = req.body.accepted;

            if (!ticketId) {
                return res.status(400).json({ ok: false, message: "Ticket id is required" });
            }

            const service = new ticketService(new ticketHelper());
            await service.updateAccepted(ticketId, accepted);

            return res.status(200).send();
        } catch (e) {
            if (e instanceof TicketBadRequest) {
                return res.status(400).send();
            }
            if (e instanceof TicketNotFound) {
                return res.status(404).send();
            }
            console.error(e);
            return res.status(500).send();
        }
    }
}
