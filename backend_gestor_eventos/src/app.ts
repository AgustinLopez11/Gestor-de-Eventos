import "dotenv/config"

import Fastify from "fastify"
import { eventRouters } from "./modules/events/events.routers.js"
import { usersRouters } from "./modules/users/users.routers.js"
import { loginRouters } from "./modules/login/login.routers.js"
import { errorHandler } from "./common/errors/error-handler.js"
import jwtPlugin from "./plugins/jwt.js"
import cors from "@fastify/cors"

export function buildApp() {

    const app = Fastify({
        logger: true
    })

    app.register(jwtPlugin)
    app.register(cors, {
        origin: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    })
    app.register(loginRouters, { prefix: "/api/login" })
    app.register(eventRouters, { prefix: "/api/events" })
    app.register(usersRouters, { prefix: "/api/users" })
    app.setErrorHandler(errorHandler)

    return app
}

