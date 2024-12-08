import { BaseController } from "../base.controller"
import { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import { formatDate } from "../../middlewares/format"
import users from "../../models/users"
import messages from "../../models/messages"

class MessagesController extends BaseController {
    public getByUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id
            const query_params: any = req.query

            // Check if the ID is valid
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return this.respondInvalid(res, `Invalid ID`)
            }

            const guest = await users.find({
                _id: id,
                deleted_at: { $exists: false },
            })

            if (!guest.length) return this.respondInvalid(res, `User not found`)

            const skipRecords = (+query_params.p - 1) * +query_params.pp

            const docs: any = await messages
                .find({
                    user: { $in: id },
                    deleted_at: { $exists: false },
                })
                .skip(+skipRecords)
                .limit(+query_params.pp || 30)
                .sort({ created_at: -1 })

            return this.respondSuccess(res, `Success`, docs)
        } catch (err) {
            next(err)
        }
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body
            const id = req.params.id

            const find_id = await users.find({
                _id: id,
                deleted_at: { $exists: false },
            })
            if (!find_id) return this.respondInvalid(res, `User not found`)

            const data = {
                ...body,
                created_at: formatDate(Date.now()),
                user: id,
            }

            const new_message = await messages.create(data)
            if (!new_message) return this.respondServerError(res)

            return this.respondSuccess(res, `Success`, new_message)
        } catch (err) {
            next(err)
        }
    }
}

export default new MessagesController()
