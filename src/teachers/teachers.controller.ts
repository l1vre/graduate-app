import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { Teacher } from './teacher.entity';
import { CreateTeacherDto } from './dtos/create-teacher.dto';
import { ResponseType } from 'src/common/types/response.type';
import { ChangeGroupDto } from './dtos/change-group.dto';

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

	@Patch(':id')
	async changeGroup(
		@Param('id', ParseIntPipe) id: number,
		@Body() data: ChangeGroupDto
	): Promise<Teacher> {
		return await this.teachersService.changeGroup(id, data);
	}

	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number): Promise<ResponseType> {
		return this.teachersService.remove(id);
	}
}
