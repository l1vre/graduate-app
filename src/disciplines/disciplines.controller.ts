import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { DisciplinesService } from './disciplines.service';
import { Discipline } from './discipline.entity';

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
}
