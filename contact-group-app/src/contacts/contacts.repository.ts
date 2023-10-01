import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class ContactsRepository {
    private contact: any;

    constructor() {
        const prisma = new PrismaClient
        this.contact = prisma.contact;
    }

    async create(params: any): Promise<any> {
        const data = instanceToPlain(params);
        const newContact = await this.contact.create({
            data: data
        });

        return newContact;
    }

    async update(id: string, params: any): Promise<any> {
        const updatedContact = await this.contact.update({
            where: { id: id },
            data: params
        });

        return updatedContact;
    }

    async findMany(query: any): Promise<any> {
        return this.contact.findMany({ where: query });
    }

    async findByEmail(query: any): Promise<any> {
        return this.contact.findUnique({ where: query });
    }

    async findById(id: string): Promise<any> {
        return this.contact.findUnique({ where: { id: id } });
    }

    async softDelete(id: string): Promise<any> {
        const currentDate = new Date();
        const updatedContact = await this.contact.update({
            where: { id: id },
            data: { deletedAt: currentDate }
        });

        return updatedContact;
    }

    async hardDelete(id: string): Promise<any> {
        const contact = await this.findById(id)
        if(!contact){
            throw new NotFoundException('Contact not found');
        }
        const updatedContact = await this.contact.delete({
            where: { id: id },
        });

        return updatedContact;
    }

    async restore(id: string): Promise<any> {
        const updatedContact = await this.contact.update({
            where: { id: id },
            data: { deletedAt: null }
        });

        return updatedContact;
    }
}
