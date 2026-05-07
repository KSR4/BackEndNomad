import { NextFunction, Request, Response } from "express";
import { TokenManager } from "../service/tokenManagerService";


export class UserNotVerifiedMiddleware {

    async run(req: Request, res: Response, next: NextFunction) {
        if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
            return res.status(401).json({
                ok: false,
                message: "Unauthorized"
            })
        }

        const token = req.headers.authorization.replace("Bearer ", "")

        try {
            const userData = await TokenManager.verify(token)

            res.locals = {
                userId: userData.sub,
                userOwner: userData.role
            }

        } catch {
            return res.status(401).send()
        }

        next()
    }
}