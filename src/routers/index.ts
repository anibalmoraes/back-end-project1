import express from "express"
import { contact } from "./contact.routes"
import { login } from "./login.routes"
import { user } from "./user.routes"


const router = express()

router.use(user)
router.use(login)
router.use(contact)

export { router }