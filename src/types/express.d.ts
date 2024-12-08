export {}

declare global {
	namespace Express {
		interface SignedInUser {
			id: string
			username: string
		}

		interface Request {
			user?: SignedInUser
		}
	}
}
