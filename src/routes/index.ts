import express from "express"
import AuthRoutes from "./auth.routes"
import UsersRoutes from "./users.routes"
import MessagesRoutes from "./messages.routes";

const router = express.Router()

router.use("/auth", AuthRoutes)
router.use("/users", UsersRoutes)
router.use("/messages", MessagesRoutes)

export default router
