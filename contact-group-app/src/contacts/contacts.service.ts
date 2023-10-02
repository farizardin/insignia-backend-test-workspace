import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateContactDto } from './contact-dto/create-contact.dto';
import { ContactsRepository } from './contacts.repository';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class ContactsService {
    private contactsRepository: ContactsRepository;
    private user: any;
    constructor() { this.contactsRepository = new ContactsRepository }

    async listContact(query: Record<string, any>) {
        const contacts = this.contactsRepository.findMany(query);
        return contacts;
    }

    async getContact(email: string) {
        const data = { email: email }
        const contact = this.contactsRepository.findByEmail(data);
        this.validateContact(contact)

        return contact;
    }

    async createContact(params: CreateContactDto) {
        const contact = this.contactsRepository.create(params);

        return contact;
    }

    async updateContact(id: string, params: any) {
        const contactDtoObject = instanceToPlain(params);
        const contact = await this.contactsRepository.findById(id);
        this.validateContact(contact)
        const updatedContact = this.contactsRepository.update(id, contactDtoObject);

        return updatedContact;
    }

    async softDeleteContact(id: string) {
        const contact = await this.contactsRepository.findById(id);
        this.validateContact(contact)
        const deletedContact = this.contactsRepository.softDelete(id);

        return deletedContact;
    }

    async hardDeleteContact(id: string) {
        const contact = await this.contactsRepository.findById(id);
        this.validateContact(contact)
        const deletedContact = this.contactsRepository.hardDelete(id);

        return deletedContact;
    }

    async restoreContact(id: string) {
        const contact = await this.contactsRepository.findById(id);
        this.validateContact(contact)
        const restoredContact = this.contactsRepository.restore(id);

        return restoredContact;
    }

    set setUser(user: any) {
        this.user = user;
    }

    private validateContact(contact: any) {
        const msg = 'Action is not permitted!';
        if(!this.user) throw new UnauthorizedException();
        if(this.user.role == 'ADMIN' || this.user.id == contact.userId) return;

        throw new UnauthorizedException(msg)
    }
}
