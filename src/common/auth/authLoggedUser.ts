import {
	getUserFromJWT,
	respondUnauthenticated,
	respondUnauthorized,
} from "./common"
import { Request, Response, NextFunction } from "express"
import users from "../../models/users"

export const authLoggedUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let jwtInfo = getUserFromJWT(req)

	// Log para depurar el JWT
	console.log("JWT Info:", jwtInfo)

	if (!jwtInfo || !jwtInfo.user_id || !jwtInfo.user_username)
		return respondUnauthorized(res)

	const user = await users.find({
		_id: jwtInfo.user_id,
		deleted_at: { $exists: false },
	})

	if (!user.length) return respondUnauthorized(res)

	const user_logged = user[0]

	if (!user_logged.authenticated) return respondUnauthenticated(res)

	// Log para verificar el usuario autenticado
	console.log("User authenticated:", user_logged)

	// Asignar usuario al objeto req
	// @ts-ignore
	req.user = {
		id: user_logged._id.toString(),
		username: user_logged.middle_name
			? `${user_logged.first_name} ${user_logged.middle_name} ${user_logged.last_name}`
			: `${user_logged.first_name} ${user_logged.last_name}`,
	}

	next()
}
