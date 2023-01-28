import jwt from "jsonwebtoken"

export const signToken = (payload: any) => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
    })
}

export const verifyToken = (token: string) => {
    jwt.verify(token, process.env.JWT_SECRET as string)
}