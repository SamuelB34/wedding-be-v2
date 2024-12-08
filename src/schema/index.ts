import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql"
import { GET_ALL_GUESTS, GET_GUEST_BY_ID } from "./queries/guestsQueries"
import {
	CREATE_GUEST,
	DELETE_GUEST,
	UPDATE_GUEST,
} from "./mutations/guestsMutations"
import { LOGIN_USER } from "./mutations/loginMutation"
import { GET_ALL_GROUPS } from "./queries/groupsQueries"
import { CREATE_GROUP, UPDATE_GROUP } from "./mutations/groupsMutations"

/**
 * Root query type that defines the available query operations.
 * @type {GraphQLObjectType}
 */
const RootQuery = new GraphQLObjectType({
	/**
	 * Name of the root query type.
	 * @type {string}
	 */
	name: "RootQueryType",

	/**
	 * Fields available for querying in the root query type.
	 * @type {Object}
	 */
	fields: {
		/**
		 * Fetch all guests from the database.
		 * @type {Object}
		 * @see {GET_ALL_GUESTS}
		 */
		getAllGuests: GET_ALL_GUESTS,

		/**
		 * Fetch all groups from the database.
		 * @type {Object}
		 * @see {GET_ALL_GROUPS}
		 */
		getAllGroups: GET_ALL_GROUPS,

		/**
		 * Fetch a single guest by ID from the database.
		 * @type {Object}
		 * @see {GET_GUEST_BY_ID}
		 */
		getGuestById: GET_GUEST_BY_ID,
	},
})

/**
 * Mutation type that defines the available mutation operations.
 * @type {GraphQLObjectType}
 */
const Mutation = new GraphQLObjectType({
	/**
	 * Name of the mutation type.
	 * @type {string}
	 */
	name: "Mutation",

	/**
	 * Fields available for mutation operations.
	 * @type {Object}
	 */
	fields: {
		/**
		 * Create a new guest in the database.
		 * @type {Object}
		 * @see {CREATE_GUEST}
		 */
		createGuest: CREATE_GUEST,

		/**
		 * Update a guest in the database.
		 * @type {Object}
		 * @see {CREATE_GUEST}
		 */
		updateGuest: UPDATE_GUEST,

		/**
		 * Delete a guest from the database.
		 * @type {Object}
		 * @see {DELETE_GUEST}
		 */
		deleteGuest: DELETE_GUEST,

		/**
		 * Create a new group in the database.
		 * @type {Object}
		 * @see {CREATE_GROUP}
		 */
		createGroup: CREATE_GROUP,

		/**
		 * Update a group in the database.
		 * @type {Object}
		 * @see {UPDATE_GROUP}
		 */
		updateGroup: UPDATE_GROUP,

		/**
		 * Authenticate a user and return a JWT token.
		 * @type {Object}
		 * @see {LOGIN_USER}
		 */
		login: LOGIN_USER,
	},
})

/**
 * The GraphQL schema defines the structure of the queries and mutations.
 * @type {GraphQLSchema}
 */
export const schema = new GraphQLSchema({
	/**
	 * The root query of the schema.
	 * @type {GraphQLObjectType}
	 */
	query: RootQuery,

	/**
	 * The mutation operations of the schema.
	 * @type {GraphQLObjectType}
	 */
	mutation: Mutation,
})
