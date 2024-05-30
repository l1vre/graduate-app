import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Discipline } from './discipline.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class DisciplinesService {
	constructor(
		@InjectRepository(Discipline)
		private readonly disciplinesRepository: Repository<Discipline>,
		private readonly entityManager: EntityManager
	) {}

	async getAll(): Promise<Discipline[]> {
		return await this.disciplinesRepository.find();
	}
}
