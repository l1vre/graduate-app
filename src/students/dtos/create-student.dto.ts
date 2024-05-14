import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateStudentDto {
	@IsNotEmpty()
	@IsString()
	full_name: string;

	@IsNotEmpty()
	@IsDateString()
	date_of_birth: string;

	@IsOptional()
	@IsString()
	coursework?: string;

	@IsOptional()
	@IsString()
	graduate_work?: string;

	@IsOptional()
	@IsString()
	user_id?: number;
	
	@IsOptional()
	@IsString()
	group_id?: number;
}