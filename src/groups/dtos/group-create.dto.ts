import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateGroupDto {
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(4)
	code: number;
}
