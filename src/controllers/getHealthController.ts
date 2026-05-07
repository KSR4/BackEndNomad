import { Request, Response } from "express"

export class GetHealthController {

    async run (req: Request, res: Response): Promise<Response> {
        return res.status(200).json({
            ok: true
        })
    }

}