import {
	BadGatewayException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateTeacherDto } from './dtos/create-teacher.dto';
import { GroupsService } from 'src/groups/groups.service';
import { ResponseType } from 'src/common/types/response.type';

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

	async getOne(id: number): Promise<Teacher> {
		const teacher = await this.teachersRepository.findOneBy({ id });
		if (!teacher) throw new NotFoundException();
		return teacher;
	}

	async create(data: CreateTeacherDto): Promise<Teacher> {
		try {
			if (data.group_code) await this.groupsService.getOne(data.group_code);
			return await this.entityManager.save(new Teacher(data));
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}

	async remove(id: number): Promise<ResponseType> {
		const teacher = await this.getOne(id);
		try {
			this.teachersRepository.delete(teacher.id);
			return { message: 'success', statusCode: 200 };
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}

}
