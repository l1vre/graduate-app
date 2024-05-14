import { BadGatewayException, Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { Student } from './student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dtos/create-student.dto';
import { GroupsService } from 'src/groups/groups.service';

@Injectable()
export class StudentsService {
	constructor(
		@InjectRepository(Student)
		private readonly studentsRepository: Repository<Student>,
		private readonly entityManager: EntityManager
	) {}

	async findAllFromGroup(groupCode: number): Promise<Student[]> {
		return await this.studentsRepository.findBy({ group_id: groupCode });
	}

	async create(data: CreateStudentDto): Promise<Student> {
		try {
			return await this.entityManager.save(new Student(data));
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}
}
