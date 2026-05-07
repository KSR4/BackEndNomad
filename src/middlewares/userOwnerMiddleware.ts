import { NextFunction, Request, Response } from "express"
import { TokenManager } from "../service/tokenManagerService"
import { Role } from "../entities/user"

export class UserOwnerMiddleware {

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

      if (userData.role !== Role.OWNER && userData.role !== Role.ADMIN) {
        return res.status(403).json({
          ok: false,
          message: "Solo los propietarios o administradores pueden acceder"
        })
      }

        res.locals = {
            userId: userData.sub,
            userOwner: userData.role
        }

        if (!userData.isVerified) {
          return res.status(401).json({
            ok: false,
            message: "Account not verified"
          })
        }
      
    } catch {
      return res.status(401).send()
    }

    next()
  }
}
