import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async register(@Body() data: RegisterDto): Promise<User> {
		return await this.authService.register(data);
	}

	@Post('login')
	async login(@Body() data: LoginDto): Promise<Object> {
		return await this.authService.login(data);
	}

	@Get('logout')
	async logout() {
		console.log('logout');
	}
}
