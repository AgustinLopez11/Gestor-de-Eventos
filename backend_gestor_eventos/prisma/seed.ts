import { PrismaClient } from "../src/generated/prisma/client.js";
import bcrypt from "bcrypt"
import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter })

async function main() {

    const hashedPassword = await bcrypt.hash("Admin1234", 10)

    await prisma.user.createMany({
        data: [
            {
                name: "Admin",
                email: "admin@gmail.com",
                password: hashedPassword,
                role: "admin"
            }
        ],
        skipDuplicates: true
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
