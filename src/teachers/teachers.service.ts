import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class TeachersService {
	constructor(
		@InjectRepository(Teacher)
		private readonly teachersRepository: Repository<Teacher>,
		private readonly entityManager: EntityManager
	) {}

	async getAll(): Promise<Teacher[]> {
		return this.teachersRepository.find();
	}
}
