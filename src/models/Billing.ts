import { Schema, model, models } from "mongoose"

const BillingSchema = new Schema(
  {
    fullName: String,
    email: String,
    phone: String,
    payableAmount: Number,
  },
  { timestamps: true }
)

export default models.Billing || model("Billing", BillingSchema)
