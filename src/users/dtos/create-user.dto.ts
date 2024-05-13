import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { UserRoles } from "src/common/enums/user-roles.enum";
import { Int32 } from "typeorm";

export class CreateUserDto {
	@IsNotEmpty()
	@IsString()
	@MinLength(3)
	@MaxLength(32)
	login: string;
	
	@IsNotEmpty()
	@IsString()
	@MinLength(6)
	@MaxLength(20)
	password: string;

	@IsOptional()
	role?: UserRoles
}