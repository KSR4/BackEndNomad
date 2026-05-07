import { Request, Response } from "express"
import { eventService } from "../../service/eventService"
import { eventHelper } from "../../helpers/eventHelper"
import { EventNotFound } from "../../errors/event/eventNotFound"
import { EventBadRequest } from "../../errors/event/eventBadRequest"

export class DeleteEventController {
    async run(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id as string
            const service = new eventService(new eventHelper())
            await service.delete(id)

            return res.status(200).json({ ok: true })
        } catch (e) {
            if (e instanceof EventNotFound) return res.status(404).json({ ok: false, message: e.message })
            if (e instanceof EventBadRequest) return res.status(400).json({ ok: false, message: e.message })
            return res.status(500).json()
        }
    }
}
