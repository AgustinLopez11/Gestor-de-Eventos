import "@fastify/jwt";
import { FastifyRequest, FastifyReply } from "fastify";
import "fastify";
import { Role } from "./jwt.js";

declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: {
            id: string;
            email: string;
            name: string | null
            role: Role
        };
        user: {
            id: string;
            email: string;
            role: Role
        };

        Params: {
            id: string
        };
    }
}


export type QueryType = {
    date?: string,
    filtOptions?: string,
    page?: string,
    limit?: string
}

declare module "fastify" {
    interface FastifyInstance {
        authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
        authorize: (roles: ("user" | "admin")[]) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>
    }
}