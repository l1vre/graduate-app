import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Group } from './group.entity';
import { CreateGroupDto } from './dtos/group-create.dto';

@Controller('groups')
export class GroupsController {
	constructor(private readonly groupsService: GroupsService) {}

	@Get()
	async getAll(): Promise<Group[]> {
		return await this.groupsService.getAll();
	}

	@Get('/:code')
	async getOne(@Param('code', ParseIntPipe) code: number): Promise<Group> {
		return this.groupsService.getOne(code);
	}

	@Post()
	async create(@Body() data: CreateGroupDto): Promise<Group> {
		return await this.groupsService.create(data);
	}

	@Delete('/:code')
	async remove(@Param('code', ParseIntPipe) code: number): Promise<Object> {
		return await this.groupsService.remove(code);
	}
}
