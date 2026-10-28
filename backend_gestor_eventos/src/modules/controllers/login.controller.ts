import { FastifyRequest, FastifyReply } from "fastify";
import { loginService } from "../login/login.services.js";
import bcrypt from "bcrypt"

export const loginController = {

    login: async (req: FastifyRequest<{ Body: { email: string, password: string } }>, reply: FastifyReply) => {
        const user = await loginService.login(req.body)
        if (!user) {
            return reply.status(401).send({ message: "Usuario o Contraseña inválidos", status: reply.statusCode })
        }
        const hashedPassword = await bcrypt.compare(req.body.password, user.password)

        if (!hashedPassword) {
            return reply.status(401).send({ message: "Usuario o Contraseña inválidos", status: reply.statusCode })
        }

        const token = req.server.jwt.sign({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        }, { expiresIn: "2d" })
        return reply.status(200).send({ message: "Acceso Exitoso", status: reply.statusCode, user: { name: user.name }, token })

    }
}