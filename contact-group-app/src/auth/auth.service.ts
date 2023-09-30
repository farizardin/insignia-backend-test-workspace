import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './auth-dto/login.dto';

@Injectable()
export class AuthService {
    private jwtService: JwtService;
    constructor(private readonly usersService: UsersService) {
        this.jwtService = new JwtService;
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.getUser(email);
        const passwordValid = await bcrypt.compare(password, user.password)
        if (user && passwordValid) {
            return user;
        }

        throw new NotAcceptableException('could not find the user');
    }

    async login(loginDto: LoginDto): Promise<any> {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        const payload = { sub: user.id, email: user.email };
        return {
            id: user.id,
            apiToken: this.jwtService.sign(payload, { secret: process.env.SECRET_KEY || 'secrete' }),
        };
    }
}