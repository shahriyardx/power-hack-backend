import Express from "express"
import * as dotenv from 'dotenv'
dotenv.config()

const app = Express()

// Middlewares
app.use(Express.json())

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`)
})