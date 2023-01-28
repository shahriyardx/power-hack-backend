import Express, { Request, Response } from "express"
import { validate } from "../utils/validator"
import { signSchema } from "../schema/sign.schema"
import User from "../models/User"
import * as argon from "argon2"

const router = Express.Router()

router.post(
  "/registration",
  validate(signSchema),
  async (req: Request, res: Response) => {
    const exists = await User.findOne({
      email: req.body.email,
    })

    if (exists)
      return res
        .status(403)
        .json({ success: false, message: "email is already registered" })
    
    const hash = await argon.hash(req.body.password)

    const user = await User.create({
      email: req.body.email,
      hash: hash,
    })

    const userObj = user.toObject()
    delete userObj.hash

    res.send(userObj)
  }
)

export default router
