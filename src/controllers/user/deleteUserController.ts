import { Request, Response } from "express"
import { userService } from "../../service/userService"
import { userHelper } from "../../helpers/userHelper"
import { UserNotFound } from "../../errors/user/userNotFound"
import { UserBadRequest } from "../../errors/user/userBadRequest"

export class DeleteUserController {
    async run(req: Request, res: Response): Promise<Response> {
        try {
            const id = res.locals.userId
            const service = new userService(new userHelper())
            await service.delete(id)

            return res.status(200).json({ ok: true })
        } catch (e) {
            if (e instanceof UserNotFound) return res.status(404).json({ ok: false, message: e.message })
            if (e instanceof UserBadRequest) return res.status(400).json({ ok: false, message: e.message })
            return res.status(500).json()
        }
    }
}
