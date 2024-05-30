import {
	BadGatewayException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Discipline } from './discipline.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateDisciplineDto } from './dtos/create-discipline.dto';
import { EditDisciplineDto } from './dtos/edit-discipline.dto';
import { ResponseType } from 'src/common/types/response.type';

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

	async getOne(id: number): Promise<Discipline> {
		const discipline = await this.disciplinesRepository.findOneBy({ id });
		if (!discipline) throw new NotFoundException('discipline');
		// потом добавить чтоб можно было смотреть за какими группами закреплена дисциплина
		return discipline;
	}

	async create(data: CreateDisciplineDto): Promise<Discipline> {
		try {
			return await this.entityManager.save(new Discipline(data));
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}

	async update(id: number, data: EditDisciplineDto): Promise<Discipline> {
		try {
			const discipline = await this.getOne(id);
			if(data.name) discipline.name = data.name;
			if(data.code) discipline.code = data.code;
			await this.entityManager.save(discipline);
			return discipline;
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}

	async remove(id: number): Promise<ResponseType> {
		const discipline = await this.getOne(id);
		try {
			this.disciplinesRepository.delete(discipline.id);
			return { message: 'success', statusCode: 200 };
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}
}
