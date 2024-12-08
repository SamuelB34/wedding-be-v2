import express, { Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import { graphqlHTTP } from "express-graphql"
import { schema } from "./schema"
import { authLoggedUser } from "./common/auth/authLoggedUser"

const cors = require("cors")
const app = express()

// Enable Cross-Origin Resource Sharing (CORS) to allow requests from any origin
app.use(cors({ origin: "*" }))

// Route to handle login mutation, not protected by authentication middleware
app.use(
	"/graphql/login",
	graphqlHTTP({
		schema, // Pass the GraphQL schema
		graphiql: true, // Enables the GraphiQL interface for development
		context: {
			user: null, // No user context for login route, since login is not protected
		},
	})
)

// Apply authentication middleware `authLoggedUser` to the rest of the routes
// This ensures all routes after this point are protected
app.use(authLoggedUser)

// Protect all other GraphQL routes and pass the authenticated user to the context
app.use(
	"/graphql",
	graphqlHTTP((req, res) => ({
		schema, // Pass the GraphQL schema
		graphiql: true, // Enables the GraphiQL interface for development
		context: {
			// @ts-ignore
			user: req.user, // Attach authenticated user to context if authenticated
		},
	}))
)

// Middleware to parse JSON request bodies
app.use(
	bodyParser.json({
		limit: "20mb", // Set a limit for the size of the request body
	})
)

export default app
