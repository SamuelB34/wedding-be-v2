import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLBoolean,
	GraphQLID,
} from "graphql"

/**
 * GraphQL object type definition for a Guest.
 * Represents the structure of a guest record in the system.
 * @type {GraphQLObjectType}
 */
export const GuestType = new GraphQLObjectType({
	/**
	 * The name of the GraphQL object type.
	 * @type {string}
	 */
	name: "Guest",

	/**
	 * Fields that represent the attributes of a guest.
	 * @type {Object}
	 */
	fields: () => ({
		/**
		 * The unique identifier for the guest.
		 * @type {GraphQLID}
		 */
		id: { type: GraphQLID },

		/**
		 * The first name of the guest.
		 * @type {GraphQLString}
		 */
		first_name: { type: GraphQLString },

		/**
		 * The middle name of the guest.
		 * @type {GraphQLString}
		 */
		middle_name: { type: GraphQLString },

		/**
		 * The last name of the guest.
		 * @type {GraphQLString}
		 */
		last_name: { type: GraphQLString },

		/**
		 * The full name of the guest, typically combining first and last name.
		 * @type {GraphQLString}
		 */
		full_name: { type: GraphQLString },

		/**
		 * The phone number of the guest.
		 * @type {GraphQLString}
		 */
		phone_number: { type: GraphQLString },

		/**
		 * Whether the guest is attending the event or not.
		 * @type {GraphQLBoolean}
		 */
		assist: { type: GraphQLBoolean },

		/**
		 * Whether the guest has responded to the invitation.
		 * @type {GraphQLBoolean}
		 */
		answer: { type: GraphQLBoolean },

		/**
		 * Whether the guest has seen the invitation.
		 * @type {GraphQLBoolean}
		 */
		saw_invitation: { type: GraphQLBoolean },

		/**
		 * The ID of the group the guest belongs to.
		 * @type {GraphQLID}
		 */
		group: { type: GraphQLID },

		/**
		 * The ID of the table assigned to the guest.
		 * @type {GraphQLID}
		 */
		table: { type: GraphQLID },

		/**
		 * The ID of the user who created the guest record.
		 * @type {GraphQLString}
		 */
		created_by: { type: GraphQLString },

		/**
		 * The ID of the user who last updated the guest record.
		 * @type {GraphQLString}
		 */
		updated_by: { type: GraphQLString },

		/**
		 * The ID of the user who deleted the guest record (if applicable).
		 * @type {GraphQLString}
		 */
		deleted_by: { type: GraphQLString },

		/**
		 * The timestamp of when the guest record was deleted (if applicable).
		 * @type {GraphQLString}
		 */
		deleted_at: { type: GraphQLString },

		/**
		 * The timestamp of when the guest record was created.
		 * @type {GraphQLString}
		 */
		createdAt: { type: GraphQLString },

		/**
		 * The timestamp of when the guest record was last updated.
		 * @type {GraphQLString}
		 */
		updatedAt: { type: GraphQLString },
	}),
})
