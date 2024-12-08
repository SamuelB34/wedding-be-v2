import { GraphQLString, GraphQLBoolean, GraphQLID } from "graphql"
import { GuestType } from "../GuestType"
import Guest from "../../models/guests"

/**
 * Mutation for creating a new guest.
 * @type {Object}
 */
export const CREATE_GUEST = {
	type: GuestType, // The mutation returns the newly created guest object
	args: {
		first_name: { type: GraphQLString },
		middle_name: { type: GraphQLString },
		last_name: { type: GraphQLString },
		phone_number: { type: GraphQLString },
		assist: { type: GraphQLBoolean },
		answer_invitation: { type: GraphQLBoolean },
		saw_invitation: { type: GraphQLBoolean },
		answer_sd: { type: GraphQLBoolean },
		saw_sd: { type: GraphQLBoolean },
		created_by: { type: GraphQLString },
	},
	/**
	 * Resolver function for creating a new guest.
	 * @param {any} _ - Unused parameter.
	 * @param {Object} args - The arguments passed to the mutation.
	 * @param {Object} context - The context object containing user authentication.
	 * @returns {Promise<Guest>} - The newly created guest object.
	 * @throws {Error} - Throws an error if the user is not authenticated.
	 */
	resolve: async (_: any, args: any, context: any) => {
		// Check if the user is authenticated
		if (!context.user) {
			throw new Error("Unauthorized. Authentication is required.")
		}

		// Logic for creating a new guest
		const guest = new Guest({
			...args, // Spread the provided arguments into the new guest object
			created_by: context.user.id, // Set the 'created_by' field to the authenticated user's ID
		})

		// Save the guest to the database and return the created guest
		return await guest.save()
	},
}

/**
 * Mutation for deleting a guest.
 * @type {Object}
 */
export const DELETE_GUEST = {
	type: GuestType, // The mutation returns the deleted guest object
	args: {
		/**
		 * The ID of the guest to be deleted.
		 * @type {string}
		 */
		id: { type: GraphQLID },
	},
	/**
	 * Resolver function for deleting a guest.
	 * @param {any} _ - Unused parameter.
	 * @param {Object} id - The guest ID passed to the mutation.
	 * @param {Object} context - The context object containing user authentication.
	 * @returns {Promise<Guest>} - The deleted guest object.
	 * @throws {Error} - Throws an error if the user is not authenticated.
	 */
	resolve: async (_: any, { id }: any, context: any) => {
		// Check if the user is authenticated
		if (!context.user) {
			throw new Error("Unauthorized. Authentication is required.")
		}

		// Logic for deleting the guest by ID
		return await Guest.findByIdAndDelete(id) // Delete the guest by the provided ID
	},
}
