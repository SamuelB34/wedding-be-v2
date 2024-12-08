import { GraphQLList, GraphQLID, GraphQLNonNull } from "graphql"
import { GuestType } from "../GuestType"
import Guest from "../../models/guests"

/**
 * Query to get all guests.
 * @type {Object}
 */
export const GET_ALL_GUESTS = {
	/**
	 * The return type of the query is a list of guests.
	 * @type {GraphQLList<GuestType>}
	 */
	type: new GraphQLList(GuestType),

	/**
	 * Resolver function to retrieve all guests from the database.
	 * @returns {Promise<Guest[]>} - A promise that resolves to a list of all guests.
	 */
	resolve: async () => {
		// Retrieve and return all guests from the database
		return await Guest.find()
	},
}

/**
 * Query to get a specific guest by their ID.
 * @type {Object}
 */
export const GET_GUEST_BY_ID: any = {
	/**
	 * The return type of the query is a single guest.
	 * @type {GuestType}
	 */
	type: GuestType,

	/**
	 * Arguments required for this query.
	 * @type {Object}
	 * @property {GraphQLID} id - The ID of the guest to retrieve.
	 */
	args: {
		id: { type: new GraphQLNonNull(GraphQLID) }, // ID is required and cannot be null
	},

	/**
	 * Resolver function to retrieve a guest by their ID.
	 * @param {unknown} _ - Unused parameter.
	 * @param {Object} args - The arguments passed to the query.
	 * @param {string} args.id - The ID of the guest to retrieve.
	 * @returns {Promise<Guest | null>} - A promise that resolves to the guest with the provided ID, or null if not found.
	 */
	resolve: async (_: unknown, args: { id: string }) => {
		// Retrieve and return the guest by ID
		return await Guest.findById(args.id)
	},
}
