import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs';
const prisma = new PrismaClient()
async function main() {
    const salt = await bcrypt.genSalt();
    const admin = await prisma.user.upsert({
        where: { email: 'admin@prisma.io' },
        update: {},
        create: {
            email: 'admin@prisma.io',
            name: 'Admin',
            password: await bcrypt.hash('adminpassword', salt),
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