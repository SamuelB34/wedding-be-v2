import express from "express"
import MessagesController from "../controllers/messages/messages.controller";
import { authLoggedUser } from "../common/auth/authLoggedUser"

const router = express.Router()

router.get("/:id", authLoggedUser, MessagesController.getByUser)

router.post("/:id", MessagesController.create)

export default router
