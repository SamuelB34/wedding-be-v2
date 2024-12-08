import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLBoolean,
	GraphQLList,
} from "graphql"

/**
 * GraphQL object type definition for a Group.
 * Represents the structure of a group record in the system.
 * @type {GraphQLObjectType}
 */
export const GroupType = new GraphQLObjectType({
	/**
	 * The name of the GraphQL object type.
	 * @type {string}
	 */
	name: "Group",

	/**
	 * Fields that represent the attributes of a group.
	 * @type {Object}
	 */
	fields: () => ({
		/**
		 * The unique identifier for the group.
		 * @type {GraphQLID}
		 */
		id: { type: GraphQLID },

		/**
		 * The name of the group.
		 * @type {GraphQLString}
		 */
		name: { type: GraphQLString },

		/**
		 * The list of guests in the group.
		 * @type {GraphQLList}
		 */
		guests: {
			type: new GraphQLList(GraphQLID),
			description: "List of guest IDs associated with the group.",
		},

		/**
		 * The ID of the table assigned to the group (optional).
		 * @type {GraphQLID}
		 */
		table: { type: GraphQLID },

		/**
		 * The ID of the user who created the group record.
		 * @type {GraphQLString}
		 */
		created_by: { type: GraphQLString },

		/**
		 * The ID of the user who last updated the group record.
		 * @type {GraphQLString}
		 */
		updated_by: { type: GraphQLString },

		/**
		 * The ID of the user who deleted the group record (if applicable).
		 * @type {GraphQLString}
		 */
		deleted_by: { type: GraphQLString },

		/**
		 * The timestamp of when the group record was deleted (if applicable).
		 * @type {GraphQLString}
		 */
		deleted_at: { type: GraphQLString },

		/**
		 * The timestamp of when the group record was created.
		 * @type {GraphQLString}
		 */
		createdAt: { type: GraphQLString },

		/**
		 * The timestamp of when the group record was last updated.
		 * @type {GraphQLString}
		 */
		updatedAt: { type: GraphQLString },
	}),
})
