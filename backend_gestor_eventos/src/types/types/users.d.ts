import { Role } from "./jwt.js"

export type User = {
    id: string,
    email: string,
    password: string,
    name?: string | null,
    role?: string
    createdAt: Date
}

export type loginUser = {
    id: string,
    email: string,
    name: string,
    role:string,
    iat: number,
    exp: number
}