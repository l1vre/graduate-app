import { Injectable } from '@nestjs/common';
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
			console.log('При создании произошла ошибка: ', error);
			throw new Error('При создании пользователя произошла ошибка');
		}
	}

	async checkPassword(data: LoginDto): Promise<Object> {
		try {
			const user = await this.userRepository.findOneBy({ login: data.login });
			if(!user) {
				console.log('Такого юзера нет');
				throw new Error('Такого юзера нет');
			}
			const isCorrect = await bcrypt.compare(data.password, user.password);
			return {
				login: user.login,
				passwordCorrect: isCorrect
			};
		} catch (error) {
			console.log('Произошла ошибка: ', error);
			throw new Error('При авторизации произошла ошибка');
		}
	}

	logout(id: number): string {
		return `${id} - logout`
	}
}
