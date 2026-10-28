import { FastifyInstance } from "fastify";
import { eventController } from "../controllers/events.controller.js";

export async function eventRouters(app: FastifyInstance) {

    app.get("/", { preHandler: [app.authenticate] }, eventController.getAll)

    app.get<{ Params: { id: string } }>("/:id", {
        schema: {
            params: {
                type: "object",
                properties: {
                    id: { type: "string" }
                },
                required: ["id"]
            }
        }, preHandler: [app.authenticate]
    }, eventController.getById)

    app.post("/", {
        schema: {
            body: {
                type: "object",
                required: ["title", "date", "time", "status"],
                properties: {
                    title: { type: "string", minLength: 4, pattern: '.*\\S.*' },
                    description: { type: "string" },
                    date: { type: "string", minLength: 24, pattern: '.*\\S.*' },
                    time: { type: "string", minLength: 1, pattern: '.*\\S.*' },
                    place: { type: "string" },
                    status: { type: "string", enum: ["Pendiente", "Completado"] }
                }
            }
        }, preHandler: [app.authenticate]
    }, eventController.create)

    app.put("/:id", {
        schema: {
            params: {
                type: "object",
                properties: {
                    id: { type: "string" }
                },
                required: ["id"]
            },
            body: {
                type: "object",
                properties: {
                    title: { type: "string", minLength: 1, pattern: '.*\\S.*' },
                    description: { type: "string" },
                    date: { type: "string", minLength: 1, pattern: '.*\\S.*' },
                    time: { type: "string", minLength: 1, pattern: '.*\\S.*' },
                    place: { type: "string" },
                    status: { type: "string", enum: ["Pendiente", "Completado"] }
                }
            }
        }, preHandler: [app.authenticate]
    }, eventController.update)

    app.patch("/:id", {
        schema: {
            params: {
                type: "object",
                properties: {
                    id: { type: "string" }
                },
                required: ["id"]
            },
            body: {
                type: "object",
                properties: {
                    status: { type: "string", enum: ["Pendiente", "Completado"] }
                },
                required: ["status"]
            }
        },
        preHandler: [app.authenticate]
    }, eventController.onpatch)

    app.delete("/:id", {
        schema: {
            params: {
                type: "object",
                properties: {
                    id: { type: "string" }
                },
                required: ["id"]
            }

        }, preHandler: [app.authenticate]
    }, eventController.delete)
}