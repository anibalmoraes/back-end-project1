import "express-async-errors"
import express from "express"
import { errorHandler } from "./errors/error"
import { router } from "./routers"
import cors from "cors"
const app = express()
app.use(express.json())
app.use(cors())
app.use(router)
app.use(errorHandler)
export default app
