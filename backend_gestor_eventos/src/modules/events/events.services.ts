import "dotenv/config"
import { FiltroFechas, type Event } from "../../types/types/events.js";
import { prisma } from "../../plugins/prisma.js"
import { ReturnDate_Inc_End } from "../../helpers/DateIncEnd.js";
import { AppError } from "../../common/errors/AppError.js";

export const eventService = {
    getAll: async (userId: string, dates: string | undefined, filtOptions: string | undefined, page1: number, limit1: number) => {

        const skip = (page1 - 1) * limit1
        const date: FiltroFechas = {}
        const hoy = new Date()

        try {

            const { start, end } = ReturnDate_Inc_End(dates, filtOptions)
            switch (filtOptions) {
                case "eventos proximos":

                    const [totalEventos, eventos] = await prisma.$transaction([
                        prisma.event.count({ where: { userId, ...(start && { date: { gte: start, lt: end } }) } }),
                        prisma.event.findMany({ where: { userId, ...(start && { date: { gte: start, lt: end } }) }, orderBy: [{ date: "asc" }, { time: "asc" }], take: limit1, skip: skip })
                    ])

                    const totalPaginas = Math.ceil(totalEventos / limit1)
                    return { eventos: eventos, pagination: { page: page1, limit: limit1, total: totalEventos, totalPaginas: totalPaginas } }

                case "eventos completados":

                    const [totalEventos2, eventos2] = await prisma.$transaction([
                        prisma.event.count({ where: { userId, ...(start && { date: { gte: start, lt: end } }), status: "Completado" } }),
                        prisma.event.findMany({ where: { userId, ...(start && { date: { gte: start, lt: end } }), status: "Completado" }, orderBy: [{ date: "asc" }, { time: "asc" }], take: limit1, skip: skip })
                    ])

                    const totalPaginas2 = Math.ceil(totalEventos2 / limit1)
                    return { eventos: eventos2, pagination: { page: page1, limit: limit1, total: totalEventos2, totalPaginas: totalPaginas2 } }

                case "eventos pendientes":
                    date.gt = hoy

                    if (start) {
                        date.gte = start
                        date.lt = end
                    }

                    const [totalEventos3, eventos3] = await prisma.$transaction([
                        prisma.event.count({ where: { userId, date, status: "Pendiente" } }),
                        prisma.event.findMany({ where: { userId, date, status: "Pendiente" }, orderBy: [{ date: "asc" }, { time: "asc" }], take: limit1, skip: skip })
                    ])

                    const totalPaginas3 = Math.ceil(totalEventos3 / limit1)
                    return { eventos: eventos3, pagination: { page: page1, limit: limit1, total: totalEventos3, totalPaginas: totalPaginas3 } }

                case "eventos vencidos":

                    if (date) {
                        date.lt = hoy
                    }

                    if (start) {
                        date.gte = start
                        date.lt = end < hoy ? end : hoy
                    }

                    const [totalEventos4, eventos4] = await prisma.$transaction([
                        prisma.event.count({ where: { userId, date, status: "Pendiente" } }),
                        prisma.event.findMany({ where: { userId, date, status: "Pendiente" }, orderBy: [{ date: "asc" }, { time: "asc" }], take: limit1, skip: skip })
                    ])

                    const eventos4_2 = eventos4.map(event => ({ ...event, status: "Vencido" }))
                    const totalPaginas4 = Math.ceil(totalEventos4 / limit1)

                    return { eventos: eventos4_2, pagination: { page: page1, limit: limit1, total: totalEventos4, totalPaginas: totalPaginas4 } }

                default:
                    const [totalEventos5, eventos5] = await prisma.$transaction([
                        prisma.event.count({ where: { userId, ...(start && { date: { gte: start, lt: end } }) } }),
                        prisma.event.findMany({ where: { userId, ...(start && { date: { gte: start, lt: end } }) }, orderBy: [{ date: "asc" }, { time: "asc" }], take: limit1, skip: skip })
                    ])

                    const eventos5_1 = eventos5.map((event) => {
                        const timeValue = new Date()
                        timeValue.setHours(0, 0, 0, 0)
                        const timeEvent = new Date(event.date)

                        if (event.status == "Pendiente" && timeEvent < timeValue) {
                            event.status = "Vencido"
                        }
                        return event

                    })

                    const totalPaginas5 = Math.ceil(totalEventos5 / limit1)
                    return { eventos: eventos5_1, pagination: { page: page1, limit: limit1, total: totalEventos5, totalPaginas: totalPaginas5 } }
            }

        } catch {
            return null
        }

    },

    getById: async (id: string, userId: string) => {

        try {
            return await prisma.event.findUnique({
                where: { id, userId }
            })
        } catch {
            return null
        }
    },

    create: async (data: Omit<Event, "id">) => {
        try {
            return await prisma.event.create({ data })
        } catch(err) {
            console.log(err)
            throw new AppError("Ya existe un Evento con las misma fechas y horas", 409)
        }
    },

    update: async (id: string, data: Partial<Event>) => {
        try {
            return await prisma.event.update({
                where: { id },
                data
            })
        } catch {
            return null
        }
    },

    patch: async (id: string, data: Partial<Event>) => {
        try {
            return await prisma.event.update({
                where: { id },
                data
            })
        } catch {
            return null
        }
    },

    delete: async (id: string) => {
        try {
            return await prisma.event.delete({
                where: { id }
            })
        } catch {
            return null
        }
    }
}


