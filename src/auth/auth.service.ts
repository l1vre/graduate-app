import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { RegisterDto } from "./dtos/register.dto";
import { User } from "src/users/user.entity";
import { LoginDto } from "./dtos/login.dto";

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService) {}

	async register(data: RegisterDto): Promise<User> {
		return await this.usersService.create(data);
	}

	async login(data: LoginDto): Promise<Object> {
		return await this.usersService.checkPassword(data);
	}

}