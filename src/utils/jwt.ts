import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export const signToken = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  })
}

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET as string)
    } catch {
        return null
    }
}

export const vertifyTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization
  if (!authorization)
    return res
      .status(403)
      .json({ success: false, message: "unauthorized", should_logout: false })
    
  const verified = verifyToken(authorization.split(" ")[1])
  if (!verified)
    return res
      .status(403)
      .json({ success: false, message: "unauthorized", should_logout: true })

  return next()
}
