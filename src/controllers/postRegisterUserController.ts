import type { Request, Response } from "express"
import { userService } from "../service/userService"
import { userHelper } from "../helpers/userHelper"
import { UserBadRequest } from "../errors/user/userBadRequest"

export class RegisterController {

    async run (req: Request, res: Response): Promise<Response> {
        try {
            
            const service = new userService(new userHelper())
            await service.register(req.body.username, req.body.email, req.body.password)

            return res.status(200).json({
                ok: true,
            })
        } catch(e) {
            if (e instanceof UserBadRequest) return res.status(400).send()

            return res.status(500).json({
            })
        }
    }

}