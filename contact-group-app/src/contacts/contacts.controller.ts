import { Controller, Get } from '@nestjs/common';

@Controller('contacts')
export class ContactsController {
    @Get()
    getData() {
        return { message: 'hello' };
    }
}
