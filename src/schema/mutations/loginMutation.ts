import { GraphQLString } from "graphql"
import users from "../../models/users" // Ensure you have the user model defined

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

// GraphQL mutation for logging in a user
export const LOGIN_USER = {
	type: GraphQLString, // The mutation returns a JWT token as a string
	args: {
		username: { type: GraphQLString }, // Argument for username (the user's unique identifier)
		password: { type: GraphQLString }, // Argument for password
	},
	resolve: async (_: any, { username, password }: any, context: any) => {
		// Check if both username and password are provided
		if (!username || !password) {
			throw new Error("Username and password are required.")
		}

		// Search for the user by username in the database
		const user = await users.findOne({ username })

		// If no user is found, throw an error
		if (!user) {
			throw new Error("User not found.")
		}

		// Compare the provided password with the hashed password stored in the database
		const isMatch = await bcrypt.compare(password, user.password)

		// If the passwords do not match, throw an error
		if (!isMatch) {
			throw new Error("Incorrect password.")
		}

		// Create the payload for the JWT token (typically, the user ID and username)
		const payload = {
			user_id: user._id, // User's unique identifier
			user_username: user.username, // User's username
		}

		// Generate the JWT token (JWT_SECRET should be stored in your .env file)
		const token = jwt.sign(payload, process.env.JWT_SECRET || "secret")

		// Return the generated JWT token
		return token
	},
}
