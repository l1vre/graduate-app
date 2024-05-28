import { Controller, Get } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { Teacher } from './teacher.entity';

@Controller('teachers')
export class TeachersController {
	constructor(private readonly teachersService: TeachersService) {}

	@Get()
	async getAll(): Promise<Teacher[]> {
		return await this.teachersService.getAll();
	}
}
