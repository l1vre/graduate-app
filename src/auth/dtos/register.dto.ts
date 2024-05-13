import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
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
}