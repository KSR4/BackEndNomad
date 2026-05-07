import { Response, Request } from "express"
import { TokenManager } from "../service/tokenManagerService"
import { userService } from "../service/userService"
import { userHelper } from "../helpers/userHelper"
import { InvalidCredentials } from "../errors/user/invalidCredentials"
import { UserBadRequest } from "../errors/user/userBadRequest"
import { UserNotVerified } from "../errors/user/userNotVerified"

export class PostLoginUserController {
    async run (req: Request, res: Response): Promise<Response> {
        try {
            const service = new userService(new userHelper())
            const user = await service.login(req.body.email, req.body.password)       

            const token = await TokenManager.generate({ 
                sub: user.id, 
                role: user.role,
                isVerified: user.isVerified
            })

            return res.status(200).json({
                ok: true,
                data: {
                    token,
                    isVerified: user.isVerified
                }
            })
        } catch (e) {
            if (e instanceof UserBadRequest) return res.status(400).send()
            if (e instanceof InvalidCredentials) return res.status(401).send()

            return res.status(500).send()
        }
        

    }
}