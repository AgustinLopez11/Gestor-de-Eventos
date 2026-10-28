import fp from "fastify-plugin"
import { FastifyRequest, FastifyReply } from "fastify";
import fastifyJwt from "@fastify/jwt";

export default fp(async function (fastify) {
    fastify.register(fastifyJwt, {
        secret: process.env.JWT_SECRET || "secretAE23"
    });
    fastify.decorate("authenticate", async function (request: FastifyRequest, reply: FastifyReply) {
        try {
            const decoded = await request.jwtVerify<{ id: string, email: string, role: ("user" | "admin") }>()
            request.user = decoded
        } catch (err) {
            reply.code(401).send({ message: "Tu sesión a expirado vuelva a iniciar sesión", error: "Token invalido o token inexistente", CODE: "TOKEN_EXPIRED", status: reply.statusCode })
        }
    })

    fastify.decorate("authorize", (roles: ("user" | "admin")[]) => {
        return async function (request: FastifyRequest, reply: FastifyReply) {
            if (!roles.includes(request.user.role)) {
                return reply.code(403).send({ message: "Acceso denegado", error: "No cuenta con los permisos necesarios para Admin" })
            }
        }
    })
})