import {
	BadGatewayException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateGroupDto } from './dtos/group-create.dto';

@Injectable()
export class GroupsService {
	constructor(
		@InjectRepository(Group)
		private readonly groupRepository: Repository<Group>,
		private readonly entityManager: EntityManager
	) {}

	async getAll(): Promise<Group[]> {
		return await this.groupRepository.find();
	}

	async getOne(code: number): Promise<Group> {
		const group = await this.groupRepository.findOneBy({ code });
		if(!group) {
			throw new NotFoundException();
		}
		return group;
	}

	async create(data: CreateGroupDto): Promise<Group> {
		try {
			return await this.entityManager.save(new Group(data));
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}

	async remove(code: number) {
		const group = await this.groupRepository.findOneBy({ code });
		if (!group) {
			throw new NotFoundException();
		}

		await this.groupRepository.delete(group.id);
		return { message: 'success', codeStatus: 200 };
	}
}
