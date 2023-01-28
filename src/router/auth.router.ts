import Express, { Request, Response } from "express"
import { validate } from "../utils/validator"
import { signSchema } from "../schema/sign.schema"

const router = Express.Router()

router.post(
  "/registration",
  validate(signSchema),
  (req: Request, res: Response) => {
    res.json(req.body)
  }
)

export default router
