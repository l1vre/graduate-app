import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTeacherDto {
	@IsNotEmpty()
	@IsString()
	full_name: string;

	@IsOptional()
	@IsString()
	user_id?: number;

	@IsOptional()
	@IsString()
	group_code?: number;
}
