import { FastifyRequest, FastifyReply } from "fastify";
import { usersService } from "../users/users.services.js";
import bcrypt from "bcrypt"
import { User } from "../../types/types/users.js";

export const usersController = {

    getAll: async (req: FastifyRequest, reply: FastifyReply) => {
        const userOr = req.user.role
        const users = await usersService.getAll(userOr)
        return reply.status(200).send({ message: "Lista de Usuarios", users })
    },
    getById: async (req: FastifyRequest, reply: FastifyReply) => {
        const id = (req.params as { id: string }).id
        const user = await usersService.getById(id)

        if (!user) {
            return reply.status(404).send({ message: "Usuario no Encontrado" })
        }

        return user
    },

    create: async (req: FastifyRequest) => {
        const { email, password, name, role } = req.body as Omit<User, "id" | "createdAt">
        const hashedPassword = await bcrypt.hash(password, 10)
        const userNew = { email, password: hashedPassword, name, role }

        return await usersService.create(userNew)
    },
    update: async (req: FastifyRequest, reply: FastifyReply) => {
        const id = (req.params as { id: string }).id
        const data = req.body as Partial<User>
        const user = await usersService.getById(id)

        if (!user) {
            return reply.status(404).send({ message: "Usuario no Encontrado" })
        }

        await usersService.update(id, data)
        const userUpdated = await usersService.getById(id)
        return userUpdated

    },
    delete: async (req: FastifyRequest, reply: FastifyReply) => {
        const id = (req.params as { id: string }).id
        const user = await usersService.getById(id)

        if (!user) {
            return reply.status(404).send({ message: "Usuario no Encontrado" })
        }

        const deleted = await usersService.delete(id)
        return deleted
    }
}