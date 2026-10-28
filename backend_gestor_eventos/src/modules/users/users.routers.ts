import { FastifyInstance } from "fastify";
import { usersController } from "../controllers/users.controller.js";

export async function usersRouters(app: FastifyInstance) {

    app.get("/", { preHandler: [app.authenticate, app.authorize(["admin","user"])] }, usersController.getAll)

    app.get("/:id", {   
        schema: {
            params: {
                type: "object",
                properties: {
                    id: { type: "string" }
                },
                required: ["id"]
            }
        }, preHandler: [app.authenticate, app.authorize(["admin","user"])]
    }, usersController.getById)

    app.post("/", {
        schema: {
            body: {
                type: "object",
                required: ["email", "password", "name", "role"],
                properties: {
                    email: { type: "string", minLength: 1, pattern: '.*\\S.*' },
                    password: { type: "string", minLength: 1, pattern: '.*\\S.*' },
                    name: { type: "string", minLength: 1, pattern: '.*\\S.*' },
                    role: { type: "string", enum: ["admin", "user"] }
                }
            }
        }, preHandler: [app.authenticate]
    }, usersController.create)

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
                    email: { type: "string", minLength: 1, pattern: '.*\\S.*' },
                    password: { type: "string", minLength: 1, pattern: '.*\\S.*' },
                    name: { type: "string", minLength: 1, pattern: '.*\\S.*' },
                    role: { type: "string", enum: ["admin", "user"] }
                }
            }
        }, preHandler: [app.authenticate, app.authorize(["admin", "user"])]
    }, usersController.update)

    app.delete("/:id", {
        schema: {
            params: {
                type: "object",
                properties: {
                    id: { type: "string" }
                },
                required: ["id"]
            }

        }, preHandler: [app.authenticate, app.authorize(["admin"])]
    }, usersController.delete)
}