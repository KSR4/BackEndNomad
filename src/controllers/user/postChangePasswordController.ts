import { Request, Response } from "express"
import { userService } from "../../service/userService";
import { userHelper } from "../../helpers/userHelper";
import { UserBadRequest } from "../../errors/user/userBadRequest";
import { InvalidCredentials } from "../../errors/user/invalidCredentials";
import { UserNotFound } from "../../errors/user/userNotFound";

export class PostChangePasswordController {

    async run(req: Request, res: Response): Promise<Response> {

        try {
            const id = res.locals.userId
            const { currentPassword, newPassword } = req.body

            if (!currentPassword || !newPassword) {
                return res.status(400).json({
                    ok: false,
                    message: "Current and new passwords are required"
                });
            }

            const service = new userService(new userHelper())
            await service.changePassword(id, currentPassword, newPassword)

            return res.status(200).json({
                ok: true,
                message: "Password changed successfully"
            })
        } catch (e) {
            if (e instanceof UserBadRequest) return res.status(400).json({ ok: false, message: e.message })
            if (e instanceof InvalidCredentials) return res.status(401).json({ ok: false, message: e.message })
            if (e instanceof UserNotFound) return res.status(404).json({ ok: false, message: e.message })
            
            return res.status(500).json({
                ok: false,
                message: "Internal server error"
            })
        }
    }

}
