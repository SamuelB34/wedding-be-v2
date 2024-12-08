import {
	GraphQLList,
	GraphQLInt,
	GraphQLID,
	GraphQLNonNull,
	GraphQLString,
	GraphQLBoolean,
} from "graphql"
import { GuestType } from "../GuestType"
import Guest from "../../models/guests"

/**
 * Query to get all guests with optional pagination, search, filtering, and sorting.
 * @type {Object}
 * @description This query fetches a list of guests with support for pagination, search by name, filters for attendance and invitations, and sorting.
 * @example
 * // Example query:
 * query GetAllGuests{
 *   getAllGuests(page: 1, limit: 10, search: "John", sort: "asc", sortBy: "first_name", assist: true) {
 *     first_name
 *     last_name
 *   }
 * }
 */
export const GET_ALL_GUESTS = {
	type: new GraphQLList(GuestType),
	args: {
		/**
		 * @type {GraphQLInt}
		 * @description The page number for pagination (defaults to 1).
		 */
		page: { type: GraphQLInt },

		/**
		 * @type {GraphQLInt}
		 * @description The number of guests per page (defaults to 10).
		 */
		limit: { type: GraphQLInt },

		/**
		 * @type {GraphQLString}
		 * @description The search string for filtering guests by their name.
		 */
		search: { type: GraphQLString },

		/**
		 * @type {GraphQLString}
		 * @description The sort direction: "asc" for ascending, "desc" for descending (defaults to "asc").
		 */
		sort: { type: GraphQLString },

		/**
		 * @type {GraphQLString}
		 * @description The column to sort by (defaults to "full_name").
		 */
		sortBy: { type: GraphQLString },

		/**
		 * @type {GraphQLBoolean}
		 * @description Filter guests based on whether they attended (true/false).
		 */
		assist: { type: GraphQLBoolean },

		/**
		 * @type {GraphQLBoolean}
		 * @description Filter guests based on whether they answered the invitation (true/false).
		 */
		answer_invitation: { type: GraphQLBoolean },

		/**
		 * @type {GraphQLBoolean}
		 * @description Filter guests based on whether they saw the invitation (true/false).
		 */
		saw_invitation: { type: GraphQLBoolean },

		/**
		 * @type {GraphQLBoolean}
		 * @description Filter guests based on whether they answered the SD (true/false).
		 */
		answer_sd: { type: GraphQLBoolean },

		/**
		 * @type {GraphQLBoolean}
		 * @description Filter guests based on whether they saw the SD (true/false).
		 */
		saw_sd: { type: GraphQLBoolean },
	},

	/**
	 * Resolver function to retrieve the list of guests based on the provided arguments.
	 * @param {unknown} _ - Unused parameter.
	 * @param {Object} args - The arguments passed to the query.
	 * @param {number} args.page - The page number for pagination.
	 * @param {number} args.limit - The number of guests per page.
	 * @param {string} args.search - The search term for filtering guests by name.
	 * @param {string} args.sort - The sort direction, either "asc" or "desc".
	 * @param {string} args.sortBy - The column to sort by.
	 * @param {boolean} args.assist - The filter for whether the guest attended or not.
	 * @param {boolean} args.answer_invitation - The filter for whether the guest answered the invitation.
	 * @param {boolean} args.saw_invitation - The filter for whether the guest saw the invitation.
	 * @param {boolean} args.answer_sd - The filter for whether the guest answered the SD.
	 * @param {boolean} args.saw_sd - The filter for whether the guest saw the SD.
	 * @returns {Promise<Array>} A promise that resolves to the list of guests matching the criteria.
	 * @description This function constructs the search query based on the search string, filters, and applies sorting and pagination.
	 */
	resolve: async (
		_: any,
		{
			page = 1,
			limit = 10,
			search = "",
			sort = "asc",
			sortBy = "full_name",
			assist = undefined,
			answer_invitation = undefined,
			saw_invitation = undefined,
			answer_sd = undefined,
			saw_sd = undefined,
		}
	) => {
		const skip = (page - 1) * limit
		const trimmedSearch = search.trim()

		const searchQuery: any = {
			$and: [
				{ deleted_at: { $exists: false } }, // Filter out guests with `deleted_at` set
			],
		}

		if (trimmedSearch) {
			searchQuery.$and.push({
				$or: [
					{ first_name: { $regex: trimmedSearch, $options: "i" } },
					{ middle_name: { $regex: trimmedSearch, $options: "i" } },
					{ last_name: { $regex: trimmedSearch, $options: "i" } },
					{
						$expr: {
							$regexMatch: {
								input: {
									$concat: [
										"$first_name",
										" ",
										"$middle_name",
										" ",
										"$last_name",
									],
								},
								regex: trimmedSearch,
								options: "i",
							},
						},
					},
				],
			})
		}

		// Add the additional filters to the query if provided
		if (assist !== undefined) {
			searchQuery.$and.push({ assist })
		}
		if (answer_invitation !== undefined) {
			searchQuery.$and.push({ answer_invitation })
		}
		if (saw_invitation !== undefined) {
			searchQuery.$and.push({ saw_invitation })
		}
		if (answer_sd !== undefined) {
			searchQuery.$and.push({ answer_sd })
		}
		if (saw_sd !== undefined) {
			searchQuery.$and.push({ saw_sd })
		}

		const sortDirection = sort === "desc" ? -1 : 1
		const sortOption: { [key: string]: -1 | 1 } = { [sortBy]: sortDirection }

		// Get guests with pagination, search, and sorting
		return await Guest.find(searchQuery)
			.skip(skip)
			.limit(limit)
			.sort(sortOption)
	},
}

/**
 * Query to get a specific guest by their ID.
 * @type {Object}
 * @description This query fetches a guest by their unique ID.
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
	 * @description This function fetches a guest from the database by their unique ID.
	 */
	resolve: async (_: unknown, args: { id: string }) => {
		// Retrieve and return the guest by ID
		return await Guest.findOne({ _id: args.id, deleted_at: null })
	},
}
