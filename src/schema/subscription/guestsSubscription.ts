import { GraphQLObjectType } from "graphql"
import { GuestType } from "../GuestType"
import { PubSub } from "graphql-subscriptions"

// Crear una instancia de PubSub para manejar eventos
const pubSub: any = new PubSub()

// Definir los eventos para las suscripciones
const GUEST_ADDED = "GUEST_ADDED"
const GUEST_UPDATED = "GUEST_UPDATED"
const GUEST_DELETED = "GUEST_DELETED"

// Configuración de las suscripciones
export const GuestSubscription = new GraphQLObjectType({
	name: "GuestSubscription",
	fields: {
		/**
		 * Suscripción para escuchar la creación de nuevos invitados.
		 * @type {Object}
		 */
		guestAdded: {
			type: GuestType,
			subscribe: () => pubSub.asyncIterator([GUEST_ADDED]),
		},
		/**
		 * Suscripción para escuchar actualizaciones en invitados.
		 * @type {Object}
		 */
		guestUpdated: {
			type: GuestType,
			subscribe: () => pubSub.asyncIterator([GUEST_UPDATED]),
		},
		/**
		 * Suscripción para escuchar eliminaciones lógicas de invitados.
		 * @type {Object}
		 */
		guestDeleted: {
			type: GuestType,
			subscribe: () => pubSub.asyncIterator([GUEST_DELETED]),
		},
	},
})

/**
 * Publicadores para disparar eventos de suscripción.
 */
export const publishGuestAdded = (guest: any) =>
	pubSub.publish(GUEST_ADDED, { guestAdded: guest })
export const publishGuestUpdated = (guest: any) =>
	pubSub.publish(GUEST_UPDATED, { guestUpdated: guest })
export const publishGuestDeleted = (guest: any) =>
	pubSub.publish(GUEST_DELETED, { guestDeleted: guest })
