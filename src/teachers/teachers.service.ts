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
import { ChangeGroupDto } from './dtos/change-group.dto';

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

	async changeGroup(id: number, data: ChangeGroupDto): Promise<Teacher> {
		try {
			const teacher = await this.getOne(id);
			if (data.group_code == -1 || data.group_code === teacher.group_code) {
				teacher.group_code = data.group_code;
				await this.entityManager.save(teacher);
				return teacher;
			}
			const group = await this.groupsService.getOne(data.group_code);
			teacher.group_code = group.code;
			await this.entityManager.save(teacher);
			return teacher;
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
