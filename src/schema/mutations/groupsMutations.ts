import { GraphQLString, GraphQLID, GraphQLList, GraphQLBoolean } from "graphql"

import Guest from "../../models/guests"
import Group from "../../models/groups"
import { GroupType } from "../GroupType"
import { GuestType } from "../GuestType"

/**
 * Mutation for creating a new group and updating guests with the created group.
 * @type {Object}
 */
export const CREATE_GROUP = {
	type: GroupType, // The mutation returns the newly created group object
	args: {
		name: { type: GraphQLString }, // The name of the group
		guests: { type: new GraphQLList(GraphQLID) }, // IDs of the guests to be associated with the new group
		table: { type: GraphQLID }, // Optional table ID associated with the group
	},

	/**
	 * Resolver function for creating a new group and updating guests with the created group.
	 * @param {any} _ - Unused parameter.
	 * @param {Object} args - The arguments passed to the mutation.
	 * @param {Object} context - The context object containing user authentication.
	 * @returns {Promise<Group>} - The newly created group object.
	 * @throws {Error} - Throws an error if the user is not authenticated.
	 */
	resolve: async (_: any, args: any, context: any) => {
		// Check if the user is authenticated
		if (!context.user) {
			throw new Error("Unauthorized. Authentication is required.")
		}

		// Logic for creating a new group
		const createdGroup = new Group({
			name: args.name,
			guests: args.guests, // Initially associates guests with the group by their IDs
			table: args.table,
			created_at: new Date().toISOString(),
			created_by: context.user.id, // Set the 'created_by' field to the authenticated user's ID
		})

		// Save the group to the database
		await createdGroup.save()

		// Update each guest to associate them with the new group
		if (args.guests && args.guests.length > 0) {
			await Guest.updateMany(
				{ _id: { $in: args.guests } }, // Filter guests by their IDs
				{
					$push: {
						group: createdGroup.id,
						updated_at: new Date().toISOString(),
					},
				} // Add the new group ID to the 'groups' field of each guest
			)
		}

		// Return the newly created group
		return createdGroup
	},
}

/**
 * Mutation for updating a group and updating guests with the updated group.
 * @type {Object}
 */
export const UPDATE_GROUP = {
	type: GroupType, // The type of data returned after the update (GroupType)
	args: {
		id: { type: GraphQLID }, // The unique identifier of the group to update
		name: { type: GraphQLString }, // The updated name of the group (optional)
		guests: { type: new GraphQLList(GraphQLID) }, // The updated list of guest IDs (optional)
		table: { type: GraphQLID }, // The updated table ID (optional)
	},

	resolve: async (_: any, args: any, context: any) => {
		if (!context.user) {
			throw new Error("Unauthorized. Authentication is required.")
		}

		const { id, guests, ...updateFields } = args

		// Clean undefined fields (optional)
		Object.keys(updateFields).forEach((key) => {
			if (updateFields[key] === undefined) {
				delete updateFields[key]
			}
		})

		// Retrieve the group we are updating
		const updatedGroup = await Group.findById(id)
		if (!updatedGroup) {
			throw new Error("Group not found.")
		}

		// Step 1: Process guests that are currently assigned to the group
		if (updatedGroup.guests && updatedGroup.guests.length > 0) {
			// Find guests that are no longer part of the updated guests list
			const guestsToRemove = updatedGroup.guests.filter(
				(guestId) => !guests.includes(guestId)
			)

			// Remove those guests from the old group
			if (guestsToRemove.length > 0) {
				await Guest.updateMany(
					{ _id: { $in: guestsToRemove } },
					{ $set: { group: null } } // Remove group reference
				)

				// Remove guests from the group's guests[] array in the current group
				await Group.updateOne(
					{ _id: id },
					{ $pull: { guests: { $in: guestsToRemove } } } // Remove guests from current group
				)
			}
		}

		// Step 2: Add new guests or update their group assignments
		if (guests && guests.length > 0) {
			// Iterate over the updated guest list
			for (const guestId of guests) {
				const guest = await Guest.findById(guestId)
				if (guest) {
					// If the guest is assigned to a different group, remove them from the old group
					if (guest.group && guest.group.toString() !== id) {
						// Remove guest from the old group
						const oldGroup = await Group.findById(guest.group)
						if (oldGroup) {
							// Eliminate guest from the old group
							await Group.updateOne(
								{ _id: guest.group },
								{ $pull: { guests: guestId } } // Remove guest from the old group
							)
						}

						// Update the guest's group to the new group
						await Guest.updateOne(
							{ _id: guestId },
							{ $set: { group: id } } // Assign the guest to the new group
						)
					} else {
						// If the guest is already assigned to the correct group, skip
						await Guest.updateOne(
							{ _id: guestId },
							{ $set: { group: id } } // Ensure guest is assigned to the correct group
						)
					}

					// Add guest to the current group (if not already added)
					await Group.updateOne(
						{ _id: id },
						{ $addToSet: { guests: guestId } } // Add to group if not already present
					)
				}
			}
		}

		// Step 3: Update other fields (name, table, etc.)
		Object.assign(updatedGroup, updateFields)

		// Save the updated group
		await updatedGroup.save()

		// Return the updated group object
		return updatedGroup
	},
}
