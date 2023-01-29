import z from "zod"

export const billingSchema = z.object({
  _id: z.string().optional(),
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string().min(11).max(11),
  payableAmount: z.number(),
})