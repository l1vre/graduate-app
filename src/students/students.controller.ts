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
import { CreateStudentDto } from './dtos/create-student.dto';
import { StudentsService } from './students.service';
import { Student } from './student.entity';
import { ChangeGroupDto } from './dtos/change-group.dto';

@Controller('students')
export class StudentsController {
	constructor(private readonly studentsService: StudentsService) {}

	@Get()
	async getAll(): Promise<Student[]> {
		return this.studentsService.getAll();
	}

	@Get(':id')
	async getOne(@Param('id', ParseIntPipe) id: number): Promise<Student> {
		return this.studentsService.getOne(id);
	}

	@Post()
	async create(@Body() data: CreateStudentDto): Promise<Student> {
		return await this.studentsService.create(data);
	}

	@Patch(':id')
	async changeGroup(
		@Param('id', ParseIntPipe) id: number,
		@Body() data: ChangeGroupDto
	): Promise<Student> {
		return await this.studentsService.changeGroup(id, data);
	}

	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number) {
		return await this.studentsService.remove(id);
	}
}
