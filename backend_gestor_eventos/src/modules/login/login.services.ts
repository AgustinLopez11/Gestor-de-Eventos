import "dotenv/config"
import { type User } from "../../types/types/users.js";
import { prisma } from "../../plugins/prisma.js"

export const loginService = {

    login: (date: Omit<User,"id" | "createdAt">) => {
        const { email} = date
        try {
            return prisma.user.findUnique({
                where: { email }
            })
        } catch {
            return null
        }
    }
}