import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post
} from '@nestjs/common';
import { DisciplinesService } from './disciplines.service';
import { Discipline } from './discipline.entity';
import { CreateDisciplineDto } from './dtos/create-discipline.dto';
import { EditDisciplineDto } from './dtos/edit-discipline.dto';

@Controller('disciplines')
export class DisciplinesController {
	constructor(private readonly disciplinesService: DisciplinesService) {}

	@Get()
	async getAll(): Promise<Discipline[]> {
		return await this.disciplinesService.getAll();
	}

	@Get(':id')
	async getOne(@Param('id', ParseIntPipe) id: number): Promise<Discipline> {
		return await this.disciplinesService.getOne(id);
	}

	@Post()
	async create(@Body() data: CreateDisciplineDto): Promise<Discipline> {
		return await this.disciplinesService.create(data);
	}

	@Patch(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() data: EditDisciplineDto
	) {
		return await this.disciplinesService.update(id, data);
	}
}
