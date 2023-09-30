import { Controller, Body, Post, Get, Put, Delete, Param, Query } from '@nestjs/common';
import { CreateUserDto } from './user-dto/create-user.dto';
import { UpdateUserDto } from './user-dto/update-user.dto';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async list(
        @Query() query: any
    ): Promise<any> {
        query['deletedAt'] = {
            equals: null,
        }
        const result = await this.usersService.listUser(query);
        return {
            result: result
        };
    }

    @Get('/archived')
    async archived(
        @Query() query: any
    ): Promise<any> {
        query['deletedAt'] = {
            not: null,
        }
        const result = await this.usersService.listUser(query);
        return {
            result: result
        };
    }

    @Post('/signup')
    async createUser(
        @Body() createUserDto: CreateUserDto,
    ): Promise<any> {
        const result = await this.usersService.createUser(createUserDto);
        return {
            msg: 'User successfully registered',
            email: result.email,
            password: result.password
        };
    }

    @Put(':id/update')
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<any> {
        const result = await this.usersService.updateUser(id, updateUserDto);
        return {
            result: result
        };
    }

    @Delete(':id/archive')
    async archiveUser(
        @Param('id') id: string
    ): Promise<any> {
        const result = await this.usersService.softDeleteUser(id);
        return {
            result: result
        };
    }

    @Put(':id/restore')
    async restoreUser(
        @Param('id') id: string
    ): Promise<any> {
        const result = await this.usersService.restoreUser(id);
        return {
            result: result
        };
    }

    @Delete(':id/hard_delete')
    async deleteUser(
        @Param('id') id: string
    ): Promise<any> {
        const result = await this.usersService.hardDeleteUser(id);
        return {
            result: result
        };
    }
}
