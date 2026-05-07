import type { Request, Response } from "express"
import { reviewService } from "../../service/reviewService"
import { reviewHelper } from "../../helpers/reviewHelper"
import { ReviewNotFound } from "../../errors/review/reviewNotFound"

export class GetSelfReviewsController {

    async run(req: Request, res: Response): Promise<Response> {
        try {

            const service = new reviewService(new reviewHelper())
            const reviews = await service.findSelfReviews(res.locals.userId)

            return res.status(200).json({
                ok: true,
                data: reviews
            })
        } catch (e) {
            if (e instanceof ReviewNotFound) return res.status(404).send()

            return res.status(500).send()
        }
    }

}