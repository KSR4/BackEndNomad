import type { Request, Response } from "express"
import { NotificationNotFound } from "../../errors/notification/notificationNotFound"
import { notificationService } from "../../service/notificationService"
import { notificationHelper } from "../../helpers/notification.helper"

export class GetAllNotificationsController {

    async run(req: Request, res: Response): Promise<Response> {
        try {

            const service = new notificationService(new notificationHelper())
            const notifications = await service.findAll()

            return res.status(200).json({
                ok: true,
                data: notifications
            })
        } catch (e) {
            if (e instanceof NotificationNotFound) return res.status(200).send()

            return res.status(500).send()
        }
    }

}
