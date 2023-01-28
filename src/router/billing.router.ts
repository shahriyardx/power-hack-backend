import Express, { Request, Response } from "express"
import { vertifyTokenMiddleware } from "../utils/jwt"

const router = Express.Router()

router.get(
  "/billing-list",
  vertifyTokenMiddleware,
  async (req: Request, res: Response) => {
    res.json({ Hello: "World" })
  }
)

export default router
