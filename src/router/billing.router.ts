import Express, { Request, Response } from "express"
import Billing from "../models/Billing"
import { validate } from "../utils/validator"
import { billingSchema } from "../schema/billing.schema"

const router = Express.Router()

router.get("/billing-list", async (req: Request, res: Response) => {
  try {
    const billings = await Billing.find({})
    res.json({ success: true, billings })
  } catch {
    return res.status(400).json({
      success: false,
      message: "something went wrong while fetching billings",
    })
  }
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

router.put(
  "/update-billing/:id",
  validate(billingSchema),
  async (req: Request, res: Response) => {
    const data = req.body

    try {
      const billing = await Billing.findById(req.params.id)
      if (!billing)
        return res.status(404).json({
          success: false,
          message: "billing not found",
        })
    } catch {
      return res.status(404).json({
        success: false,
        message: "billing not found",
      })
    }

    await Billing.updateOne({ _id: req.params.id }, data)
    res.json({
      success: true,
    })
  }
)

router.delete("/delete-billing/:id", async (req: Request, res: Response) => {
  try {
    const billing = await Billing.findById(req.params.id)
    if (!billing)
      return res.status(404).json({
        success: false,
        message: "billing not found",
      })
    
    await Billing.deleteOne({ _id: req.params.id })
    res.json({ success: true })
  } catch {
    return res.status(404).json({
      success: false,
      message: "billing not found",
    })
  }
})

export default router
