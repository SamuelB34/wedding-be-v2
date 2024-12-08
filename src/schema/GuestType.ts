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
		 * The middle name of the guest (optional).
		 * @type {GraphQLString}
		 */
		middle_name: { type: GraphQLString },

		/**
		 * The last name of the guest.
		 * @type {GraphQLString}
		 */
		last_name: { type: GraphQLString },

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
		answer_invitation: { type: GraphQLBoolean },

		/**
		 * Whether the guest has seen the invitation.
		 * @type {GraphQLBoolean}
		 */
		saw_invitation: { type: GraphQLBoolean },

		/**
		 * Whether the guest has answered the SD.
		 * @type {GraphQLBoolean}
		 */
		answer_sd: { type: GraphQLBoolean },

		/**
		 * Whether the guest has seen the SD.
		 * @type {GraphQLBoolean}
		 */
		saw_sd: { type: GraphQLBoolean },

		/**
		 * The ID of the group the guest belongs to (reference to Groups).
		 * @type {GraphQLID}
		 */
		group: { type: GraphQLID },

		/**
		 * The ID of the table assigned to the guest (reference to Tables).
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
		updated_at: { type: GraphQLString },
	}),
})

/**
 * Mongoose schema and model definition for a Guest.
 * @type {Schema}
 * @description Represents a guest record with associated details, including attendance, invitation status, and timestamps.
 */
import mongoose, { Schema, model } from "mongoose"

export interface GuestType {
	first_name: string
	middle_name?: string
	last_name: string
	phone_number: string
	assist: boolean
	answer_invitation: boolean
	saw_invitation: boolean
	answer_sd: boolean
	saw_sd: boolean
	group?: string // ID of the related Group
	table?: string // ID of the related Table
	created_by: string
	updated_by?: string
	deleted_by?: string
	deleted_at?: Date
}

const guestsSchema = new Schema<GuestType>(
	{
		first_name: { type: String, required: true },
		middle_name: { type: String },
		last_name: { type: String, required: true },
		phone_number: { type: String, required: true },
		assist: { type: Boolean, required: true },
		answer_invitation: { type: Boolean, required: true, default: false },
		saw_invitation: { type: Boolean, required: true },
		answer_sd: { type: Boolean, required: true, default: false },
		saw_sd: { type: Boolean, required: true },
		group: { type: Schema.Types.ObjectId, ref: "Groups" },
		table: { type: Schema.Types.ObjectId, ref: "Tables" },
		deleted_by: { type: String },
		deleted_at: { type: Date },
		created_by: { type: String, required: true },
		updated_by: { type: String },
	},
	{
		timestamps: true,
	}
)

const Guest = model<GuestType>("Guest", guestsSchema)

export default Guest
