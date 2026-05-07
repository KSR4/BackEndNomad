import { Request, Response } from "express"
import { userService } from "../../service/userService";
import { userHelper } from "../../helpers/userHelper";
import { UserBadRequest } from "../../errors/user/userBadRequest";


export class PatchAvatarController {

    async run(req: Request, res: Response): Promise<Response> {

        try {
            const id = req.params.id
            if (!id) {
                return res.status(400).json({
                    ok: false,
                    message: "Param 'id' is required"
                });
            }

            const service = new userService(new userHelper())
            await service.updateAvatar(id, req.body.avatar)

            return res.status(200).json({
                ok: true,
            })
        } catch (e) {
            if (e instanceof UserBadRequest) return res.status(400).send()
            return res.status(500).json({
            })
        }
    }

}