import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateTeacherDto } from './dtos/create-teacher.dto';
import { GroupsService } from 'src/groups/groups.service';

@Injectable()
export class TeachersService {
	constructor(
		@InjectRepository(Teacher)
		private readonly teachersRepository: Repository<Teacher>,
		private readonly entityManager: EntityManager,
		private readonly groupsService: GroupsService
	) {}

	async getAll(): Promise<Teacher[]> {
		return this.teachersRepository.find();
	}

	async create(data: CreateTeacherDto): Promise<Teacher> {
		try {
			if (data.group_code) await this.groupsService.getOne(data.group_code);
			return await this.entityManager.save(new Teacher(data));
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}
}
