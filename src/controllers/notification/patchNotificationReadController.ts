import { Request, Response } from "express"
import { notificationService } from "../../service/notificationService"
import { notificationHelper } from "../../helpers/notification.helper"
import { NotificationNotFound } from "../../errors/notification/notificationNotFound"
import { NotificationBadRequest } from "../../errors/notification/notificationBadRequest"

export class PatchNotificationReadController {
    async run(req: Request, res: Response): Promise<Response> {
        try {
            const userId = res.locals.userId
            const { id } = req.params

            if (!id) {
                return res.status(400).json({ ok: false, message: "Notification id is required" })
            }

            const service = new notificationService(new notificationHelper())
            await service.markAsRead(id, userId)

            return res.status(200).json({ ok: true })
        } catch (e) {
            if (e instanceof NotificationNotFound) return res.status(404).json({ ok: false, message: e.message })
            if (e instanceof NotificationBadRequest) return res.status(403).json({ ok: false, message: e.message })
            return res.status(500).send()
        }
    }
}
