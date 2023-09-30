import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule), PassportModule, JwtModule.register({
    global: true,
    secretOrPrivateKey: process.env.SECRET_KEY || 'secret',
    signOptions: { expiresIn: '60s' },
  })],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
