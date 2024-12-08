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
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			created_by: context.user.id, // Set the 'created_by' field to the authenticated user's ID
		})

		// Save the guest to the database and return the created guest
		return await guest.save()
	},
}

/**
 * Mutation for updating a guest.
 *
 * This mutation allows updating a guest's information in the database.
 * Only the fields provided in the input arguments will be updated, and the rest will remain unchanged.
 *
 * @type {Object}
 */
export const UPDATE_GUEST = {
	type: GuestType, // The type of data returned after the update (GuestType)
	args: {
		id: { type: GraphQLID }, // The unique identifier of the guest to update
		first_name: { type: GraphQLString }, // The updated first name of the guest (optional)
		middle_name: { type: GraphQLString }, // The updated middle name of the guest (optional)
		last_name: { type: GraphQLString }, // The updated last name of the guest (optional)
		phone_number: { type: GraphQLString }, // The updated phone number of the guest (optional)
		assist: { type: GraphQLBoolean }, // Whether the guest will assist (optional)
		answer_invitation: { type: GraphQLBoolean }, // Whether the guest answered the invitation (optional)
		saw_invitation: { type: GraphQLBoolean }, // Whether the guest saw the invitation (optional)
		answer_sd: { type: GraphQLBoolean }, // Whether the guest answered the "save the date" (optional)
		saw_sd: { type: GraphQLBoolean }, // Whether the guest saw the "save the date" (optional)
		updated_by: { type: GraphQLString }, // The ID of the user making the update (optional)
	},

	/**
	 * Resolver function for updating a guest.
	 *
	 * @param {any} _ - Unused parameter.
	 * @param {Object} args - The arguments passed to the mutation.
	 * @param {string} args.id - The unique identifier of the guest to update.
	 * @param {string} [args.first_name] - The updated first name of the guest (optional).
	 * @param {string} [args.middle_name] - The updated middle name of the guest (optional).
	 * @param {string} [args.last_name] - The updated last name of the guest (optional).
	 * @param {string} [args.phone_number] - The updated phone number of the guest (optional).
	 * @param {boolean} [args.assist] - Whether the guest will assist (optional).
	 * @param {boolean} [args.answer_invitation] - Whether the guest answered the invitation (optional).
	 * @param {boolean} [args.saw_invitation] - Whether the guest saw the invitation (optional).
	 * @param {boolean} [args.answer_sd] - Whether the guest answered the "save the date" (optional).
	 * @param {boolean} [args.saw_sd] - Whether the guest saw the "save the date" (optional).
	 * @param {string} [args.updated_by] - The ID of the user making the update (optional).
	 * @param {Object} context - The context object containing user authentication.
	 * @returns {Promise<Guest>} - The updated guest object.
	 * @throws {Error} - Throws an error if the user is not authenticated.
	 */
	resolve: async (_: any, args: any, context: any) => {
		if (!context.user) {
			throw new Error("Unauthorized. Authentication is required.")
		}

		let { id, ...updateFields } = args

		// Remove undefined fields (optional)
		Object.keys(updateFields).forEach((key) => {
			if (updateFields[key] === undefined) {
				delete updateFields[key]
			}
		})

		updateFields = Object.assign(updateFields, {
			updated_at: new Date().toISOString(),
			updated_by: context.user.id,
		})

		// Update only the fields that are provided
		const updatedGuest = await Guest.findByIdAndUpdate(id, updateFields, {
			new: true,
		})

		return updatedGuest
	},
}

/**
 * Mutation for soft-deleting a guest by setting a `deleted_at` timestamp.
 * @type {Object}
 */
export const DELETE_GUEST = {
	type: GuestType, // The mutation returns the updated guest object
	args: {
		/**
		 * The ID of the guest to be soft-deleted.
		 * @type {string}
		 */
		id: { type: GraphQLID },
	},
	/**
	 * Resolver function for soft-deleting a guest.
	 * @param {any} _ - Unused parameter.
	 * @param {Object} id - The guest ID passed to the mutation.
	 * @param {Object} context - The context object containing user authentication.
	 * @returns {Promise<Guest>} - The updated guest object with the `deleted_at` field set.
	 * @throws {Error} - Throws an error if the user is not authenticated.
	 */
	resolve: async (_: any, { id }: any, context: any) => {
		// Check if the user is authenticated
		if (!context.user) {
			throw new Error("Unauthorized. Authentication is required.")
		}

		// Set the `deleted_at` timestamp
		const deletedGuest = await Guest.findOneAndUpdate(
			{ _id: id, deleted_at: null },
			{
				deleted_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			},
			{ new: true } // Return the updated document
		)

		// Return the updated guest object
		return deletedGuest
	},
}
