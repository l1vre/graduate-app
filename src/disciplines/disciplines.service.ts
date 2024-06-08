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
import { DisciplineForGroup } from './discipline-for-group.entity';
import { ToggleGroupDto } from './dtos/toggle-group.dto';
import { GroupsService } from 'src/groups/groups.service';

@Injectable()
export class DisciplinesService {
	constructor(
		@InjectRepository(Discipline)
		private readonly disciplinesRepository: Repository<Discipline>,
		@InjectRepository(DisciplineForGroup)
		private readonly disciplineForGroup: Repository<DisciplineForGroup>,
		private readonly entityManager: EntityManager,
		private readonly groupsService: GroupsService
	) {}

	async getAll(): Promise<Discipline[]> {
		return await this.disciplinesRepository.find();
	}

	async getOne(id: number): Promise<Discipline> {
		const discipline = await this.disciplinesRepository.findOneBy({ id });
		if (!discipline) throw new NotFoundException('discipline');
		const dfg = await this.disciplineForGroup.findBy({
			discipline_id: discipline.id
		});
		// dfg - discipline for group
		if (dfg.length <= 0) return discipline;
		discipline.groups = [];
		discipline.hours = [];
		dfg.forEach((i) => {
			discipline.groups?.push(i.group_code);
			discipline.hours?.push(i.hours);
		});
		return discipline;
	}

	async create(data: CreateDisciplineDto): Promise<Discipline> {
		try {
			return await this.entityManager.save(new Discipline(data));
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}

	async toggleGroup(
		id: number,
		data: ToggleGroupDto
	): Promise<DisciplineForGroup | Discipline> {
		const discipline = await this.getOne(id);
		if (discipline.groups) {
			if (discipline.groups.find((g) => g == data.group_code)) {
				await this.disciplineForGroup.delete({ discipline_id: discipline.id });
				discipline.groups = discipline.hours = [];
				return discipline;
			}
		}
		const group = await this.groupsService.getOne(data.group_code);
		try {
			return await this.entityManager.save(
				new DisciplineForGroup({
					discipline_id: discipline.id,
					group_code: group.code,
					hours: data.hours
				})
			);
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}

	async update(id: number, data: EditDisciplineDto): Promise<Discipline> {
		try {
			const discipline = await this.getOne(id);
			if (data.name) discipline.name = data.name;
			if (data.code) discipline.code = data.code;
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
