import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { Teacher } from './teacher.entity';
import { CreateTeacherDto } from './dtos/create-teacher.dto';
import { ResponseType } from 'src/common/types/response.type';

@Controller('teachers')
export class TeachersController {
	constructor(private readonly teachersService: TeachersService) {}

	@Get()
	async getAll(): Promise<Teacher[]> {
		return await this.teachersService.getAll();
	}

	@Get(':id')
	async getOne(@Param('id', ParseIntPipe) id: number): Promise<Teacher> {
		return await this.teachersService.getOne(id);
	}

	@Post()
	async create(@Body() data: CreateTeacherDto): Promise<Teacher> {
		return await this.teachersService.create(data);
	}

	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number): Promise<ResponseType> {
		return this.teachersService.remove(id);
	}
}
