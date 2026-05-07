import { Request, Response } from "express"
import { eventService } from "../../service/eventService"
import { eventHelper } from "../../helpers/eventHelper"
import { EventBadRequest } from "../../errors/event/eventBadRequest"

export class PostEventController {
    async run(req: Request, res: Response): Promise<Response> {
        try {
            if (res.locals.userOwner !== "ADMIN") return res.status(403).json({ ok: false, message: "Forbidden: Admin only" })

            const { name, description, location, latitude, longitude, startDate, finishDate } = req.body
            const service = new eventService(new eventHelper())
            const event = await service.create(name, description, location, latitude, longitude, startDate, finishDate)

            return res.status(201).json({
                ok: true,
                data: event
            })
        } catch (e: any) {
            if (e instanceof EventBadRequest) return res.status(400).json({ ok: false, message: e.message })
            return res.status(500).json({ ok: false, message: "Internal server error" })
        }
    }
}
