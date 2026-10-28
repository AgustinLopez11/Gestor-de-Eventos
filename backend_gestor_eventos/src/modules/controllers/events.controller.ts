import { FastifyRequest, FastifyReply } from "fastify";
import { eventService } from "../events/events.services.js";
import { Event } from "../../types/types/events.js";
import { QueryType } from "../../types/types/fastify.js";

export const eventController = {

    getAll: async (req: FastifyRequest, reply: FastifyReply) => {
        const { date, filtOptions, page, limit } = req.query as QueryType
        const page1 = page ? Number(page) : 1
        const limit1 = limit ? Number(limit) : 15

        const AllEvents = await eventService.getAll(req.user.id, date, filtOptions, page1, limit1)
        return { message: "Todos los Eventos", status: reply.statusCode, results: AllEvents }
    },
    getById: async (req: FastifyRequest, reply: FastifyReply) => {
        const id = (req.params as { id: string }).id
        const event = await eventService.getById(id, req.user.id)

        if (!event) {
            return reply.status(404).send({ message: "Evento no Encontrado", status: reply.statusCode })
        }

        return { message: "Evento Encontrado", status: reply.statusCode, evento: event }
    },

    create: async (req: FastifyRequest, reply: FastifyReply) => {
        const event = req.body as Omit<Event, "id">
        console.log(event)
        const NewEvent = await eventService.create({ ...event, userId: req.user.id })
        return { message: "Evento Creado", status: reply.statusCode, evento: NewEvent }
    },
    update: async (req: FastifyRequest, reply: FastifyReply) => {
        const id = (req.params as { id: string }).id
        const event = await eventService.getById(id, req.user.id)

        if (!event) {
            return reply.status(404).send({ message: "Evento no Actualizado", status: reply.statusCode })
        }

        await eventService.update(id, req.body as Partial<Event>)
        const eventUpdated = await eventService.getById(id, req.user.id)
        return { message: "Evento Actualizado Correctamente", status: reply.statusCode, evento: eventUpdated }

    },
    onpatch: async (req: FastifyRequest, reply: FastifyReply) => {
        const id = (req.params as { id: string }).id
        const event = await eventService.getById(id, req.user.id)

        if (!event) {
            return reply.status(404).send({ message: "Evento no Actualizado", status: reply.statusCode })
        }

        await eventService.patch(id, req.body as Partial<Event>)
        const eventPatch = await eventService.getById(id, req.user.id)
        return { message: `Evento marcado como ${eventPatch?.status}`, status: reply.statusCode, evento: eventPatch }

    },
    delete: async (req: FastifyRequest, reply: FastifyReply) => {
        const id = (req.params as { id: string }).id
        const event = await eventService.getById(id, req.user.id)

        if (!event) {
            return reply.status(404).send({ message: "Evento no Eliminado", status: reply.statusCode })
        }

        const deleted = await eventService.delete(id)
        return { message: "Evento Eliminado", status: reply.statusCode, evento: deleted }
    }
}