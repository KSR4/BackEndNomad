import type { Request, Response } from "express"
import { eventService } from "../../service/eventService"
import { eventHelper } from "../../helpers/eventHelper"
import { EventNotFound } from "../../errors/event/eventNotFound"

export class GetEventsController {

    async run(req: Request, res: Response): Promise<Response> {
        try {

            const service = new eventService(new eventHelper())
            const events = await service.findAll()

            return res.status(200).json({
                ok: true,
                data: events
            })
        } catch (e) {
            if (e instanceof EventNotFound) return res.status(404).send()

            return res.status(500).send()
        }
    }

}