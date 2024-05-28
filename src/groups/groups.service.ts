import {
	BadGatewayException,
	Inject,
	Injectable,
	NotFoundException,
	forwardRef
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateGroupDto } from './dtos/group-create.dto';
import { StudentsService } from 'src/students/students.service';
import { Student } from 'src/students/student.entity';

@Injectable()
export class GroupsService {
	constructor(
		@InjectRepository(Group)
		private readonly groupRepository: Repository<Group>,
		private readonly entityManager: EntityManager,
		@Inject(forwardRef(() => StudentsService))
		private readonly studentsService: StudentsService
	) {}

	async getAll(): Promise<Group[]> {
		return await this.groupRepository.find();
	}

	async getOne(code: number): Promise<Group> {
		const group = await this.groupRepository.findOneBy({ code });
		if(!group) {
			throw new NotFoundException('group');
		}
		const students = await this.studentsService.findAllFromGroup(code);
		return { ...group, students };
	}

	async create(data: CreateGroupDto): Promise<Group> {
		try {
			return await this.entityManager.save(new Group(data));
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}

	async remove(code: number) {
		const group = await this.getOne(code);

		if(group.students) {
			group.students.forEach(s => s.group_code = -1);
			await this.entityManager.save(group.students);
		}
		await this.groupRepository.delete(group.id);
		return { message: 'success', statusCode: 200 };
	}
}
