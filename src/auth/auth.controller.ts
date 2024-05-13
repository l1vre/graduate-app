import {
	BadRequestException,
	Body,
	Controller,
	ForbiddenException,
	Get,
	Post,
	Req
} from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async register(
		@Req() req: Request,
		@Body() data: RegisterDto
	): Promise<User> {
		if (req.session.user) {
			throw new ForbiddenException('You authorized!');
		}
		const user = await this.authService.register(data);
		req.session.user = user;
		return user;
	}

	@Post('login')
	async login(@Req() req: Request, @Body() data: LoginDto): Promise<Object> {
		if (req.session.user) {
			throw new ForbiddenException('You authorized!');
		}
		const user = await this.authService.login(data);
		req.session.user = user;
		return user;
	}

	@Get('logout')
	logout(@Req() req: Request): Object {
		if (!req.session.user) {
			throw new ForbiddenException('You not authorized');
		}
		req.session.destroy((err) => {
			if (err) {
				throw new BadRequestException(err);
			}
		});
		return { message: 'Logout success', statusCode: 200 };
	}
}
