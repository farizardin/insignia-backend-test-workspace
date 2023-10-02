import { Injectable, NotFoundException, UnprocessableEntityException, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersRepository {
    private user: any;

    constructor() {
        const prisma = new PrismaClient
        this.user = prisma.user
    }

    async create(params: any): Promise<any> {
        try {
            const data = {
                name: params.name,
                email: params.email,
                password: params.password,
            }
            const newUser = await this.user.create({
                data: data
            });

            return newUser;
        } catch (error: any) {
            const target = error.meta?.target as string[];
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002' && target.includes('email')) {
                    throw new UnprocessableEntityException('User with the same email already exists.');
                }
            }

            throw new InternalServerErrorException;
        }
    }

    async update(id: string, params: any): Promise<any> {
        const updatedUser = await this.user.update({
            where: { id: id },
            data: params
        });

        return updatedUser;
    }

    async findMany(query: any): Promise<any> {
        return this.user.findMany({ where: query });
    }

    async findByEmail(query: any): Promise<any> {
        return this.user.findUnique({ where: query });
    }

    async findById(id: string): Promise<any> {
        return this.user.findUnique({ where: { id: id } });
    }

    async softDelete(id: string): Promise<any> {
        const currentDate = new Date();
        const updatedUser = await this.user.update({
            where: { id: id },
            data: { deletedAt: currentDate }
        });

        return updatedUser;
    }

    async hardDelete(id: string): Promise<any> {
        const user = await this.findById(id)
        if (!user) {
            throw new NotFoundException('User with ID ${id} not found');
        }
        const updatedUser = await this.user.delete({
            where: { id: id },
        });

        return updatedUser;
    }

    async restore(id: string): Promise<any> {
        const updatedUser = await this.user.update({
            where: { id: id },
            data: { deletedAt: null }
        });

        return updatedUser;
    }
}
