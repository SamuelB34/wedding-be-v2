import { BaseController } from "../base.controller"
import { NextFunction, Request, Response } from "express"
import users from "../../models/users"
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

export interface LoginJwt {
	user_id: string
	user_username: string
}

export const login = async (req: any, res: Response) => {
	const { username, password } = req.body

	// Verifica que los campos no estén vacíos
	if (!username || !password) {
		return res.status(400).send({ msg: "Username and password are required" })
	}

	try {
		// Busca el usuario por su nombre de usuario
		const user = await users.findOne({ username })

		if (!user) {
			return res.status(400).send({ msg: "Invalid username or password" })
		}

		// Compara la contraseña proporcionada con la almacenada (suponiendo que uses bcrypt)
		const isMatch = await bcrypt.compare(password, user.password)

		if (!isMatch) {
			return res.status(400).send({ msg: "Invalid username or password" })
		}

		// Crea el JWT
		const token = jwt.sign(
			{ user_id: user._id, user_username: user.username },
			process.env.JWT_SECRET ?? "",
			{ expiresIn: "1h" } // El token expira en una hora
		)

		// Devuelve el token en la respuesta
		return res.send({ token })
	} catch (error) {
		console.error("Login error:", error)
		return res.status(500).send({ msg: "Internal server error" })
	}
}
