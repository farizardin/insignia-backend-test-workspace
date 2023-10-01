import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './contact-dto/create-contact.dto';
import { ContactsRepository } from './contacts.repository';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class ContactsService {
    private contactsRepository: ContactsRepository;
    constructor() { this.contactsRepository = new ContactsRepository }

    async listContact(query: Record<string, any>) {
        const contacts = this.contactsRepository.findMany(query);
        return contacts;
    }

    async getContact(email: string) {
        const data = { email: email }
        const user = this.contactsRepository.findByEmail(data);
        return user;
    }

    async createContact(params: CreateContactDto) {
        const newContactDto = new CreateContactDto;
        newContactDto.name = params.name;
        newContactDto.phoneNumber = params.phoneNumber;
        const user = this.contactsRepository.create(newContactDto);

        return user;
    }

    async updateContact(id: string, params: any) {
        const userDtoObject = instanceToPlain(params);
        const user = this.contactsRepository.update(id, userDtoObject);
        return user;
    }

    async softDeleteContact(id: string) {
        const user = this.contactsRepository.softDelete(id);
        return user;
    }

    async hardDeleteContact(id: string) {
        const user = this.contactsRepository.hardDelete(id);
        return user;
    }

    async restoreContact(id: string) {
        const user = this.contactsRepository.restore(id);
        return user;
    }
}
