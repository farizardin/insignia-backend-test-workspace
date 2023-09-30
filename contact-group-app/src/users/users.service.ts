import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user-dto/create-user.dto';
import { UpdateUserDto } from './user-dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { instanceToPlain } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    private usersRepository: UsersRepository;
    constructor() { this.usersRepository = new UsersRepository }

    async listUser(query: Record<string, any>) {
        const user = this.usersRepository.findMany(query);
        return user;
    }

    async createUser(params: CreateUserDto) {
        const newUserDto = new CreateUserDto;
        newUserDto.name = params.name;
        newUserDto.email = params.email;
        newUserDto.password = await bcrypt.hash(params.password, 5);
        const user = this.usersRepository.create(newUserDto);

        return user;
    }

    async updateUser(id: string, params: UpdateUserDto) {
        const userDtoObject = instanceToPlain(params);
        const user = this.usersRepository.update(id, userDtoObject);
        return user;
    }

    async softDeleteUser(id: string) {
        const user = this.usersRepository.softDelete(id);
        return user;
    }

    async hardDeleteUser(id: string) {
        const user = this.usersRepository.softDelete(id);
        return user;
    }

    async restoreUser(id: string) {
        const user = this.usersRepository.restore(id);
        return user;
    }
}
