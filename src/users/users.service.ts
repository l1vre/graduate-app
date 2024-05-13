import {
	BadGatewayException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
		private readonly entityManager: EntityManager
	) {}

	async create(data: CreateUserDto): Promise<User> {
		try {
			const salt = await bcrypt.genSalt();
			data.password = await bcrypt.hash(data.password, salt);
			const user = new User(data);
			return await this.entityManager.save(user);
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}

	async checkPassword(data: LoginDto): Promise<User> {
		try {
			const user = await this.userRepository.findOneBy({
				login: data.login
			});
			if (!user) {
				throw new NotFoundException();
			}
			const isCorrect = await bcrypt.compare(data.password, user.password);
			if (!isCorrect) {
				throw new UnauthorizedException('Password or login no correct');
			}
			return user;
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}
}
