import { Request, Response } from "express"
import { eventService } from "../../service/eventService"
import { eventHelper } from "../../helpers/eventHelper"
import { EventBadRequest } from "../../errors/event/eventBadRequest"
import { EventNotFound } from "../../errors/event/eventNotFound"

export class PutEventController {
    async run(req: Request, res: Response): Promise<Response> {
        try {
            if (res.locals.userOwner !== "ADMIN") return res.status(403).json({ ok: false, message: "Forbidden: Admin only" })

            const id = req.params.id as string
            const { name, description, location, latitude, longitude, startDate, finishDate } = req.body
            const service = new eventService(new eventHelper())
            await service.update(id, name, description, location, latitude, longitude, startDate, finishDate)

            return res.status(200).json({ ok: true })
        } catch (e: any) {
            if (e instanceof EventBadRequest) return res.status(400).json({ ok: false, message: e.message })
            if (e instanceof EventNotFound) return res.status(404).json({ ok: false, message: e.message })
            return res.status(500).json({ ok: false, message: "Internal server error" })
        }
    }
}
