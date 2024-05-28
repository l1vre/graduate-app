import {
	BadGatewayException,
	Inject,
	Injectable,
	NotFoundException,
	forwardRef
} from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { Student } from './student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dtos/create-student.dto';
import { GroupsService } from 'src/groups/groups.service';
import { ChangeGroupDto } from './dtos/change-group.dto';

@Injectable()
export class StudentsService {
	constructor(
		@InjectRepository(Student)
		private readonly studentsRepository: Repository<Student>,
		private readonly entityManager: EntityManager,
		@Inject(forwardRef(() => GroupsService))
		private readonly groupsService: GroupsService
	) {}

	async findAllFromGroup(groupCode: number): Promise<Student[]> {
		return await this.studentsRepository.findBy({ group_code: groupCode });
	}

	async getAll(): Promise<Student[]> {
		return await this.studentsRepository.find();
	}

	async getOne(id: number): Promise<Student> {
		const student = await this.studentsRepository.findOneBy({ id });
		if (!student) throw new NotFoundException();
		return student;
	}

	async create(data: CreateStudentDto): Promise<Student> {
		try {
			if(data.group_code)
				await this.groupsService.getOne(data.group_code);
			return await this.entityManager.save(new Student(data));
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}

	async remove(id: number) {
		const student = await this.getOne(id);
		try {
			this.studentsRepository.delete(student.id);
			return { message: 'success', statusCode: 200 };
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}

	async changeGroup(id: number, data: ChangeGroupDto): Promise<Student> {
		try {
			const student = await this.getOne(id);
			if (data.group_code === -1 || data.group_code === student.group_code) {
				student.group_code = data.group_code;
				await this.entityManager.save(student);
				return student;
			}
			const group = await this.groupsService.getOne(data.group_code);
			student.group_code = group.code;
			await this.entityManager.save(student);
			return student;
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}
}
