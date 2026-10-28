import { FastifyReply, FastifyRequest } from "fastify";

export const authorize = (roles: ("user" | "admin")[]) => {
    return async (req: FastifyRequest, reply: FastifyReply) => {
        if (!req.user) {
            return reply.status(401).send({ message: "No Autenticado" })
        }
        if (!roles.includes(req.user.role)) {
            return reply.status(403).send({ message: "No tienes permisos" })
        }
    }
}