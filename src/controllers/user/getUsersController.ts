import { Request, Response } from "express"
import { userService } from "../../service/userService"
import { userHelper } from "../../helpers/userHelper"

export class GetUsersController {
    async run(req: Request, res: Response): Promise<Response> {
        try {
            if (res.locals.userOwner !== "ADMIN") return res.status(403).json({ ok: false, message: "Forbidden: Admin only" })

            const service = new userService(new userHelper())
            const users = await service.findAll()

            return res.status(200).json({
                ok: true,
                data: users
            })
        } catch (e: any) {
            return res.status(500).json({ ok: false, message: "Internal server error" })
        }
    }
}
