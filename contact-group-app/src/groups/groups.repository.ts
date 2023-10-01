import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class GroupsRepository {
    private group: any;
    private contactList: any;

    constructor() {
        const prisma = new PrismaClient
        this.group = prisma.group;
        this.contactList = prisma.contactList;
    }

    async create(params: any): Promise<any> {
        const data = instanceToPlain(params);
        const newGroup = await this.group.create({
            data: data
        });

        return newGroup;
    }

    async update(id: string, params: any): Promise<any> {
        const updatedGroup = await this.group.update({
            where: { id: id },
            data: params
        });

        return updatedGroup;
    }

    async findMany(query: any): Promise<any> {
        return this.group.findMany({ where: query });
    }

    async findByEmail(query: any): Promise<any> {
        return this.group.findUnique({ where: query });
    }

    async insertMembers(id: string, contactIds: string[]) {
        await this.contactList.createMany({
            data: contactIds.map((contactId) => ({
                groupId: id,
                contactId: contactId,
            })),
            skipDuplicates: true, // Skip creating duplicates
        });

        const createdContactList = await this.contactList.findMany({
            where: {
              OR: contactIds.map((contactId) => ({
                groupId: id,
                contactId: contactId,
              })),
            },
          });

        return createdContactList;
    }

    async findById(id: string): Promise<any> {
        return this.group.findUnique({ where: { id: id } });
    }

    async softDelete(id: string): Promise<any> {
        const currentDate = new Date();
        const updatedGroup = await this.group.update({
            where: { id: id },
            data: { deletedAt: currentDate }
        });

        return updatedGroup;
    }

    async hardDelete(id: string): Promise<any> {
        const group = await this.findById(id)
        if (!group) {
            throw new NotFoundException('Group not found');
        }
        const updatedGroup = await this.group.delete({
            where: { id: id },
        });

        return updatedGroup;
    }

    async restore(id: string): Promise<any> {
        const updatedGroup = await this.group.update({
            where: { id: id },
            data: { deletedAt: null }
        });

        return updatedGroup;
    }
}
