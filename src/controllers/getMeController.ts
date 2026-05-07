import type { Request, Response } from "express"
import { userService } from "../service/userService"
import { userHelper } from "../helpers/userHelper"
import { UserNotFound } from "../errors/user/userNotFound"

export class GetMeController {

    async run (req: Request, res: Response): Promise<Response> {
        try {

            const userId = res.locals.userId

            const service = new userService(new userHelper())
            const user = await service.findUserById(userId)


            return res.status(200).json({
                ok: true,
                data: user
            })
        } catch(e) {
            if (e instanceof UserNotFound) return res.status(404).send()
            
            return res.status(500).send()
        }
    }

}