import { Response, Request } from "express"
import { notificationService } from "../../service/notificationService"
import { notificationHelper } from "../../helpers/notification.helper"
import { NotificationBadRequest } from "../../errors/notification/notificationBadRequest"

export class PostNotificationController {
    async run(req: Request, res: Response): Promise<Response> {
        try {

            const { title, message, userId } = req.body
            const service = new notificationService(new notificationHelper())
            await service.create(title, message, userId ?? null)

            return res.status(200).send()
        } catch (e) {
            if (e instanceof NotificationBadRequest) return res.status(400).send()
            return res.status(500).send()
        }
    }
}
