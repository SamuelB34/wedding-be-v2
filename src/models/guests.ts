import mongoose, { Schema, model } from "mongoose"

export interface GuestType {
	first_name: string
	middle_name?: string
	last_name: string
	full_name?: string
	phone_number: string
	assist: boolean
	answer: boolean
	saw_invitation: boolean
	group?: string // ID de referencia a Groups
	table?: string // ID de referencia a Tables
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
		full_name: { type: String },
		phone_number: { type: String, required: true },
		assist: { type: Boolean, required: true },
		answer: { type: Boolean, required: true, default: false },
		saw_invitation: { type: Boolean, required: true },
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
