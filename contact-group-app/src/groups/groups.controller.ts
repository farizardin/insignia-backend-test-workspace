import { Controller, Request, Body, Post, Get, Put, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { CreateGroupDto } from './group-dto/create-group.dto';
import { UpdateGroupDto } from './group-dto/update-group.dto';
import { AddGroupContactDto } from './group-dto/add-group-contact.dto';
import { GroupsService } from './groups.service';
import { JwtStrategy } from '../auth/jwt.strategy';
@Controller('groups')
export class GroupsController {
    constructor(private readonly groupsService: GroupsService) { }

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
        this.groupsService.setUser = req.user;
        const result = await this.groupsService.listGroup(query);
        return {
            data: result.map((r: any)=>({
                    id: r.id,
                    name: r.name,
                    email: r.email,
                    description: r.description,
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
        this.groupsService.setUser = req.user;
        const result = await this.groupsService.listGroup(query);
        return {
            data: result.map((r: any)=>({
                    id: r.id,
                    name: r.name,
                    email: r.email,
                    description: r.description,
            }))
        };
    }

    @UseGuards(JwtStrategy)
    @Post()
    async createGroup(
        @Request() req: any,
        @Body() createGroupDto: CreateGroupDto,
    ): Promise<any> {
        this.groupsService.setUser = req.user;
        createGroupDto.userId = req.user.id;
        const result = await this.groupsService.createGroup(createGroupDto);
        return {
            message: 'Group successfully created',
            data: {
                id: result.id,
                name: result.name,
                email: result.email,
                description: result.description,
            }
        };
    }

    @UseGuards(JwtStrategy)
    @Put(':id/update')
    async updateGroup(
        @Request() req: any,
        @Param('id') id: string,
        @Body() updateGroupDto: UpdateGroupDto,
    ): Promise<any> {
        this.groupsService.setUser = req.user;
        const result = await this.groupsService.updateGroup(id, updateGroupDto);
        return {
            data: {
                id: result.id,
                name: result.name,
                email: result.email,
                description: result.description,
            }
        };
    }

    @UseGuards(JwtStrategy)
    @Put(':id/add_contact')
    async addContact(
        @Request() req: any,
        @Param('id') id: string,
        @Body() addGroupContactDto: AddGroupContactDto,
    ): Promise<any> {
        this.groupsService.setUser = req.user;
        const result = await this.groupsService.addContact(id, addGroupContactDto);
        return {
            data: {
                id: result.id,
                name: result.name,
                email: result.email,
                description: result.description,
            }
        };
    }

    @UseGuards(JwtStrategy)
    @Put(':id/remove_contact')
    async removeContact(
        @Request() req: any,
        @Param('id') id: string,
        @Body() addGroupContactDto: AddGroupContactDto,
    ): Promise<any> {
        this.groupsService.setUser = req.user;
        const result = await this.groupsService.removeContact(id, addGroupContactDto);
        return {
            data: result
        };
    }

    @UseGuards(JwtStrategy)
    @Delete(':id/archive')
    async archiveGroup(
        @Request() req: any,
        @Param('id') id: string
    ): Promise<any> {
        this.groupsService.setUser = req.user;
        const result = await this.groupsService.softDeleteGroup(id);
        return {
            data: {
                id: result.id,
                name: result.name,
                email: result.email,
                description: result.description,
            }
        };
    }

    @UseGuards(JwtStrategy)
    @Put(':id/restore')
    async restoreGroup(
        @Request() req: any,
        @Param('id') id: string
    ): Promise<any> {
        this.groupsService.setUser = req.user;
        const result = await this.groupsService.restoreGroup(id);
        return {
            data: {
                id: result.id,
                name: result.name,
                email: result.email,
                description: result.description,
            }
        };
    }

    @UseGuards(JwtStrategy)
    @Delete(':id/hard_delete')
    async deleteGroup(
        @Request() req: any,
        @Param('id') id: string
    ): Promise<any> {
        this.groupsService.setUser = req.user;
        const result = await this.groupsService.hardDeleteGroup(id);
        return {
            data: result
        };
    }
}
