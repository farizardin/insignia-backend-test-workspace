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
        query['userId'] = req.user.id;
        this.contactsService.setUser = req.user;
        const result = await this.contactsService.listContact(query);
        return {
            data: result.map((r: any)=>({
                    id: r.id,
                    name: r.name,
                    email: r.email,
                    phoneNumber: r.phoneNumber,
            }))
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
        query['userId'] = req.user.id;
        this.contactsService.setUser = req.user;
        const result = await this.contactsService.listContact(query);
        return {
            data: result.map((r: any)=>({
                id: r.id,
                name: r.name,
                email: r.email,
                phoneNumber: r.phoneNumber,
            }))
        };
    }

    @UseGuards(JwtStrategy)
    @Post()
    async createContact(
        @Request() req: any,
        @Body() createContactDto: CreateContactDto,
    ): Promise<any> {
        this.contactsService.setUser = req.user;
        createContactDto.userId = req.user.id;
        const result = await this.contactsService.createContact(createContactDto);
        return {
            message: 'Contact successfully registered',
            data: {
                id: result.id,
                name: result.name,
                email: result.email,
                phoneNumber: result.phoneNumber
            }
        };
    }

    @UseGuards(JwtStrategy)
    @Put(':id/update')
    async updateContact(
        @Request() req: any,
        @Param('id') id: string,
        @Body() updateContactDto: UpdateContactDto,
    ): Promise<any> {
        this.contactsService.setUser = req.user;
        const result = await this.contactsService.updateContact(id, updateContactDto);
        return {
            data: {
                id: result.id,
                name: result.name,
                email: result.email,
                phoneNumber: result.phoneNumber
            }
        };
    }

    @UseGuards(JwtStrategy)
    @Delete(':id/archive')
    async archiveContact(
        @Request() req: any,
        @Param('id') id: string
    ): Promise<any> {
        this.contactsService.setUser = req.user;
        const result = await this.contactsService.softDeleteContact(id);
        return {
            data: {
                id: result.id,
                name: result.name,
                email: result.email,
                phoneNumber: result.phoneNumber
            }
        };
    }

    @UseGuards(JwtStrategy)
    @Put(':id/restore')
    async restoreContact(
        @Request() req: any,
        @Param('id') id: string
    ): Promise<any> {
        this.contactsService.setUser = req.user;
        const result = await this.contactsService.restoreContact(id);
        return {
            data: {
                id: result.id,
                name: result.name,
                email: result.email,
                phoneNumber: result.phoneNumber
            }
        };
    }

    @UseGuards(JwtStrategy)
    @Delete(':id/hard_delete')
    async deleteContact(
        @Request() req: any,
        @Param('id') id: string
    ): Promise<any> {
        this.contactsService.setUser = req.user;
        const result = await this.contactsService.hardDeleteContact(id);
        return {
            data: {
                id: result.id,
                name: result.name,
                email: result.email,
                phoneNumber: result.phoneNumber
            }
        };
    }
}
