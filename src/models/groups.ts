import mongoose, { model, Schema } from "mongoose"

export interface GroupsType {
	name: string
	guests: string[]
	table?: string
	created_at: Date
	created_by: string
	updated_at?: Date
	updated_by?: string
	deleted_at?: Date
	deleted_by?: string
}

const groupsSchema = new mongoose.Schema<GroupsType>(
	{
		name: { type: String, required: true },
		guests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Guests" }],
		table: { type: Schema.Types.ObjectId, ref: "Tables" },
		created_at: { type: Date, required: true },
		created_by: { type: String, required: true },
		updated_at: { type: Date },
		updated_by: { type: String },
		deleted_at: { type: Date },
		deleted_by: { type: String },
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
	}
)

// Register the Group model after ensuring Guest model is imported
const Group = model<GroupsType>("Groups", groupsSchema)

export default Group
