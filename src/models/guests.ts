import mongoose, { Schema, model } from "mongoose"

/**
 * Interface that defines the structure of a Guest record.
 * Used to ensure that data related to a guest is correctly structured.
 * @interface GuestType
 */
export interface GuestType {
	/**
	 * The first name of the guest.
	 * @type {string}
	 */
	first_name: string

	/**
	 * The middle name of the guest (optional).
	 * @type {string}
	 */
	middle_name?: string

	/**
	 * The last name of the guest.
	 * @type {string}
	 */
	last_name: string

	/**
	 * The phone number of the guest.
	 * @type {string}
	 */
	phone_number: string

	/**
	 * Indicates whether the guest will attend the event.
	 * @type {boolean}
	 */
	assist: boolean

	/**
	 * Indicates whether the guest has responded to the invitation.
	 * @type {boolean}
	 */
	answer_invitation: boolean

	/**
	 * Indicates whether the guest has seen the invitation.
	 * @type {boolean}
	 */
	saw_invitation: boolean

	/**
	 * Indicates whether the guest has responded to the Save the Date (SD) invitation.
	 * @type {boolean}
	 */
	answer_sd: boolean

	/**
	 * Indicates whether the guest has seen the Save the Date (SD) invitation.
	 * @type {boolean}
	 */
	saw_sd: boolean

	/**
	 * The ID of the group the guest belongs to (optional).
	 * @type {string}
	 */
	group?: string

	/**
	 * The ID of the table assigned to the guest (optional).
	 * @type {string}
	 */
	table?: string

	/**
	 * The ID of the user who created the guest record.
	 * @type {string}
	 */
	created_by: string

	/**
	 * The ID of the user who last updated the guest record (optional).
	 * @type {string}
	 */
	updated_by?: string

	/**
	 * The ID of the user who deleted the guest record (optional).
	 * @type {string}
	 */
	deleted_by?: string

	/**
	 * The timestamp when the guest record was deleted (optional).
	 * @type {Date}
	 */
	deleted_at?: Date
}

/**
 * Mongoose schema definition for the Guest model.
 * This schema maps the structure of a guest record in the database.
 * @constant guestsSchema
 */
const guestsSchema = new Schema<GuestType>(
	{
		/**
		 * The first name of the guest.
		 * @type {String}
		 * @required
		 */
		first_name: { type: String, required: true },

		/**
		 * The middle name of the guest (optional).
		 * @type {String}
		 */
		middle_name: { type: String },

		/**
		 * The last name of the guest.
		 * @type {String}
		 * @required
		 */
		last_name: { type: String, required: true },

		/**
		 * The phone number of the guest.
		 * @type {String}
		 * @required
		 */
		phone_number: { type: String, required: true },

		/**
		 * Indicates whether the guest will attend the event.
		 * @type {Boolean}
		 * @required
		 */
		assist: { type: Boolean, required: true },

		/**
		 * Indicates whether the guest has responded to the invitation.
		 * @type {Boolean}
		 * @required
		 * @default false
		 */
		answer_invitation: { type: Boolean, required: true, default: false },

		/**
		 * Indicates whether the guest has seen the invitation.
		 * @type {Boolean}
		 * @required
		 */
		saw_invitation: { type: Boolean, required: true },

		/**
		 * Indicates whether the guest has responded to the Save the Date (SD) invitation.
		 * @type {Boolean}
		 * @required
		 * @default false
		 */
		answer_sd: { type: Boolean, required: true, default: false },

		/**
		 * Indicates whether the guest has seen the Save the Date (SD) invitation.
		 * @type {Boolean}
		 * @required
		 */
		saw_sd: { type: Boolean, required: true },

		/**
		 * The ID of the group the guest belongs to.
		 * @type {Schema.Types.ObjectId}
		 * @ref {Groups}
		 */
		group: { type: Schema.Types.ObjectId, ref: "Groups" },

		/**
		 * The ID of the table assigned to the guest.
		 * @type {Schema.Types.ObjectId}
		 * @ref {Tables}
		 */
		table: { type: Schema.Types.ObjectId, ref: "Tables" },

		/**
		 * The ID of the user who deleted the guest record (optional).
		 * @type {String}
		 */
		deleted_by: { type: String },

		/**
		 * The timestamp when the guest record was deleted (optional).
		 * @type {Date}
		 */
		deleted_at: { type: Date },

		/**
		 * The ID of the user who created the guest record.
		 * @type {String}
		 * @required
		 */
		created_by: { type: String, required: true },

		/**
		 * The ID of the user who last updated the guest record (optional).
		 * @type {String}
		 */
		updated_by: { type: String },
	},
	{
		/**
		 * Enables automatic creation of createdAt and updatedAt fields.
		 * @type {Object}
		 */
		timestamps: true,
	}
)

/**
 * The Mongoose model for Guest, either created or fetched if already compiled.
 * This model allows interactions with the 'guests' collection in the database.
 * @constant Guest
 */
const Guest = mongoose.models.Guest || model<GuestType>("Guest", guestsSchema)

export default Guest
