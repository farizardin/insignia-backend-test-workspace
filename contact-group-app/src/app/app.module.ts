import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from '../contacts/contacts.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { GroupsModule } from '../groups/groups.module';
@Module({
  imports: [ContactsModule, UsersModule, AuthModule, GroupsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
