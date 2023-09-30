import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './auth-dto/login.dto';

@Controller('auth')
export class AuthController {
    private usersService: UsersService;
    constructor(private authService: AuthService) {
        this.usersService = new UsersService;
    }

    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
        const result = await this.authService.login(loginDto);
        const userId = result.id;
        const data = { apiToken: result.apiToken, lastActivityAt: new Date() };
        const user = await this.usersService.updateUser(userId, data);
        return {
            apiToken: user.apiToken,
        }
    }
}