import { Controller, Request, Body, Post, Get, Put, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { CreateContactDto } from './contact-dto/create-contact.dto';
import { UpdateContactDto } from './contact-dto/update-contact.dto';
import { ContactsService } from './contacts.service';
import { JwtStrategy } from '../auth/jwt.strategy';
@Controller('contacts')
export class ContactsController {
    constructor(private readonly contactsService: ContactsService) { }

    @UseGuards(JwtStrategy)
    @Get()
    async list(
        @Request() req: any,
        @Query() query: any
    ): Promise<any> {
        query['deletedAt'] = {
            equals: null,
        }
        const result = await this.contactsService.listContact(query);
        return {
            result: result
        };
    }

    @UseGuards(JwtStrategy)
    @Get('/archived')
    async archived(
        @Request() req: any,
        @Query() query: any
    ): Promise<any> {
        query['deletedAt'] = {
            not: null,
        }
        const result = await this.contactsService.listContact(query);
        return {
            result: result
        };
    }

    
    @Post()
    async createContact(
        @Request() req: any,
        @Body() createContactDto: CreateContactDto,
    ): Promise<any> {
        const result = await this.contactsService.createContact(createContactDto);
        return {
            msg: 'Contact successfully registered',
            data: {
                id: result.id,
                name: result.name,
                email: result.email,
                role: result.email,
                createdAt: result.createdAt,
            }
        };
    }

    @Put(':id/update')
    async updateContact(
        @Request() req: any,
        @Param('id') id: string,
        @Body() updateContactDto: UpdateContactDto,
    ): Promise<any> {
        const result = await this.contactsService.updateContact(id, updateContactDto);
        return {
            result: result
        };
    }

    @Delete(':id/archive')
    async archiveContact(
        @Param('id') id: string
    ): Promise<any> {
        const result = await this.contactsService.softDeleteContact(id);
        return {
            result: result
        };
    }

    @Put(':id/restore')
    async restoreContact(
        @Param('id') id: string
    ): Promise<any> {
        const result = await this.contactsService.restoreContact(id);
        return {
            result: result
        };
    }

    @Delete(':id/hard_delete')
    async deleteContact(
        @Param('id') id: string
    ): Promise<any> {
        const result = await this.contactsService.hardDeleteContact(id);
        return {
            result: result
        };
    }
}
