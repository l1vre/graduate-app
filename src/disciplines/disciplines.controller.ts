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
import { DisciplinesService } from './disciplines.service';
import { Discipline } from './discipline.entity';
import { CreateDisciplineDto } from './dtos/create-discipline.dto';
import { EditDisciplineDto } from './dtos/edit-discipline.dto';
import { ResponseType } from 'src/common/types/response.type';
import { ToggleGroupDto } from './dtos/toggle-group.dto';
import { DisciplineForGroup } from './discipline-for-group.entity';

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
	async toggleGroup(
		@Param('id', ParseIntPipe) id: number,
		@Body() data: ToggleGroupDto
	): Promise<DisciplineForGroup | Discipline> {
		return await this.disciplinesService.toggleGroup(id, data);
	}

	@Patch(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() data: EditDisciplineDto
	): Promise<Discipline> {
		return await this.disciplinesService.update(id, data);
	}

	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number): Promise<ResponseType> {
		return await this.disciplinesService.remove(id);
	}
}
