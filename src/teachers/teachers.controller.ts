import { Body, Controller, Get, Post } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { Teacher } from './teacher.entity';
import { CreateTeacherDto } from './dtos/create-teacher.dto';

@Controller('teachers')
export class TeachersController {
	constructor(private readonly teachersService: TeachersService) {}

	@Get()
	async getAll(): Promise<Teacher[]> {
		return await this.teachersService.getAll();
	}

	@Post()
	async create(@Body() data: CreateTeacherDto): Promise<Teacher> {
		return await this.teachersService.create(data);
	}
}
