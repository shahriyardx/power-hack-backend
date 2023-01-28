import mongoose from "mongoose"
import Express from "express"
import * as dotenv from 'dotenv'
import authRouter from "./router/auth.router"
import billingRouter from "./router/billing.router"
import { vertifyTokenMiddleware } from "./utils/jwt"

dotenv.config()

const app = Express()

// Middlewares
app.use(Express.json())
app.use(authRouter)
app.use(vertifyTokenMiddleware, billingRouter)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`)
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.DB_URL as string)

    mongoose
})