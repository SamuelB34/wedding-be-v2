import { GraphQLList, GraphQLString, GraphQLInt, GraphQLBoolean } from "graphql"
import { GroupType } from "../GroupType"
import Group from "../../models/groups"
import Guest from "../../models/guests"

export const GET_ALL_GROUPS = {
	type: new GraphQLList(GroupType),
	args: {
		/**
		 * @type {GraphQLInt}
		 * @description The page number for pagination (defaults to 1).
		 */
		page: { type: GraphQLInt },

		/**
		 * @type {GraphQLInt}
		 * @description The number of groups per page (defaults to 10).
		 */
		limit: { type: GraphQLInt },

		/**
		 * @type {GraphQLString}
		 * @description The search string for filtering groups by their name.
		 */
		search: { type: GraphQLString },

		/**
		 * @type {GraphQLBoolean}
		 * @description Filter groups based on whether they have guests assigned.
		 */
		hasGuests: { type: GraphQLBoolean },
	},
	/**
	 * Resolver function to retrieve the list of groups based on the provided arguments.
	 * @param {unknown} _ - Unused parameter.
	 * @param {Object} args - The arguments passed to the query.
	 * @param {number} args.page - The page number for pagination.
	 * @param {number} args.limit - The number of groups per page.
	 * @param {string} args.search - The search term for filtering groups by name.
	 * @param {boolean} args.hasGuests - Whether to filter groups with guests.
	 * @returns {Promise<Array>} A promise that resolves to the list of groups matching the criteria.
	 */
	resolve: async (
		_: any,
		{ page = 1, limit = 10, search = "", hasGuests = undefined }
	) => {
		const skip = (page - 1) * limit
		const trimmedSearch = search.trim()

		const searchQuery: any = {
			$and: [
				{ deleted_at: { $exists: false } }, // Exclude soft-deleted groups
			],
		}

		// Add search condition
		if (trimmedSearch) {
			searchQuery.$and.push({
				name: { $regex: trimmedSearch, $options: "i" },
			})
		}

		// Filter groups based on whether they have guests
		if (hasGuests !== undefined) {
			searchQuery.$and.push({
				guests: hasGuests ? { $exists: true, $ne: [] } : { $eq: [] },
			})
		}

		const groups = await Group.find(searchQuery)
			.skip(skip)
			.limit(limit)
			.populate({
				path: "guests", // Populate the guests field
				select: "first_name middle_name last_name", // Select specific fields
				model: Guest, // Use the Guest model for reference
			})

		return groups
	},
}
