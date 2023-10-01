import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateGroupDto } from './group-dto/create-group.dto';
import { GroupsRepository } from './groups.repository';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class GroupsService {
    private groupsRepository: GroupsRepository;
    private user: any;
    constructor() { this.groupsRepository = new GroupsRepository }

    async listGroup(query: Record<string, any>) {
        const groups = this.groupsRepository.findMany(query);
        return groups;
    }

    async getGroup(email: string) {
        const data = { email: email }
        const group = this.groupsRepository.findByEmail(data);
        this.validateGroup(group)

        return group;
    }

    async createGroup(params: CreateGroupDto) {
        const group = this.groupsRepository.create(params);

        return group;
    }

    async updateGroup(id: string, params: any) {
        const groupDtoObject = instanceToPlain(params);
        const group = await this.groupsRepository.findById(id);
        this.validateGroup(group)
        const updatedGroup = this.groupsRepository.update(id, groupDtoObject);

        return updatedGroup;
    }

    async addContact(id: string, params: any) {
        const contactList = await this.groupsRepository.insertMembers(id, params.contactIds);
        return contactList;
    }

    async softDeleteGroup(id: string) {
        const group = await this.groupsRepository.findById(id);
        this.validateGroup(group)
        const deletedGroup = this.groupsRepository.softDelete(id);

        return deletedGroup;
    }

    async hardDeleteGroup(id: string) {
        const group = await this.groupsRepository.findById(id);
        this.validateGroup(group)
        const deletedGroup = this.groupsRepository.hardDelete(id);

        return deletedGroup;
    }

    async restoreGroup(id: string) {
        const group = await this.groupsRepository.findById(id);
        this.validateGroup(group)
        const restoredGroup = this.groupsRepository.restore(id);

        return restoredGroup;
    }

    set setUser(user: any) {
        this.user = user;
    }

    private validateGroup(group: any) {
        const msg = 'You cannot update this group!';
        if(!this.user) throw new UnauthorizedException();
        if(this.user.role == 'ADMIN' || this.user.id == group.userId) return;

        throw new UnauthorizedException(msg)
    }
}
