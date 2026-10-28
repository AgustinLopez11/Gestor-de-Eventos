import "dotenv/config"
import { type User } from "../../types/types/users.js";
import { prisma } from "../../plugins/prisma.js"

export const usersService = {
    getAll: (userOr: string) => {
        try {
            if (userOr == "user") {
                return prisma.user.findMany({ where: { deletedAt: null } })
            }
            return prisma.user.findMany()
        } catch {
            return null
        }

    },

    getById: (id: string) => {

        try {
            return prisma.user.findUnique({
                where: { id }
            })
        } catch {
            return null
        }
    },

    create: (data: Omit<User, "id" | "createdAt">) => {
        try {
            return prisma.user.create({ data })
        } catch {
            return null
        }
    },

    update: (id: string, data: Partial<User>) => {
        try {
            return prisma.user.update({
                where: { id },
                data
            })
        } catch {
            return null
        }
    },

    delete: (id: string) => {
        try {
            return prisma.user.update({
                where: { id },
                data: { deletedAt: new Date() }
            })
        } catch {
            return null
        }
    }
}