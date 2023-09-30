import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
    private user: any;

    constructor() {
        const prisma = new PrismaClient
        this.user = prisma.user
    }

    async create(params: any): Promise<any> {
        const data = {
            name: params.name,
            email: params.email,
            password: await bcrypt.hash(params.password, 5),
        }
        const newUser = await this.user.create({
            data: data
        });

        return newUser;
    }

    async update(id: string, params: any): Promise<any> {
        const userId = parseInt(id);
        const updatedUser = await this.user.update({
            where: { id: userId },
            data: params
        });

        return updatedUser;
    }

    async findMany(query: any): Promise<any> {
        return this.user.findMany({ where: query });
    }

    async findByEmail(query: any) {
        return this.user.findUnique({ where: query });
    }

    async softDelete(id: string): Promise<any> {
        const currentDate = new Date();
        const userId = parseInt(id);
        const updatedUser = await this.user.update({
            where: { id: userId },
            data: { deletedAt: currentDate }
        });

        return updatedUser;
    }

    async hardDelete(id: string): Promise<any> {
        const userId = parseInt(id);
        const updatedUser = await this.user.delete({
            where: { id: userId },
        });

        return updatedUser;
    }

    async restore(id: string): Promise<any> {
        const userId = parseInt(id);
        const updatedUser = await this.user.update({
            where: { id: userId },
            data: { deletedAt: null }
        });

        return updatedUser;
    }
}
