import Express, { Request, Response } from "express"
import Billing from "../models/Billing"
import { validate } from "../utils/validator"
import { billingSchema } from "../schema/billing.schema"

const router = Express.Router()

router.get("/billing-list", async (req: Request, res: Response) => {
  res.json({ Hello: "World" })
})

router.post(
  "/add-billing",
  validate(billingSchema),
  async (req: Request, res: Response) => {
    try {
      const data = await Billing.create(req.body)
      return res.json({
        success: true,
        data: data.toObject(),
      })
    } catch {
      return res.status(400).json({
        success: false,
        message: "something went wrong while inserting data",
      })
    }
  }
)
export default router
