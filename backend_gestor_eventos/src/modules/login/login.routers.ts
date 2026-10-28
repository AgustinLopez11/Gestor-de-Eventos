import { FastifyInstance } from "fastify";
import { loginController } from "../controllers/login.controller.js"

export async function loginRouters(app: FastifyInstance) {

    app.post("/", {
        schema: {
            body: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: { type: "string", minLength: 1, pattern: '.*\\S.*' },
                    password: { type: "string", minLength: 1, pattern: '.*\\S.*' }
                }
            }
        }
    }, loginController.login)

}