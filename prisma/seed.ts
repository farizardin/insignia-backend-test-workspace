import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient()
async function main() {
    const admin = await prisma.user.upsert({
        where: { email: 'admin@prisma.io' },
        update: {},
        create: {
            email: 'admin@prisma.io',
            name: 'Admin',
            password: await bcrypt.hash('adminpassword', 5),
            role: 'ADMIN',
        },
    })
    console.log({ admin })
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