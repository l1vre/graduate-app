import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDisciplineDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsString()
	code: string;
}
