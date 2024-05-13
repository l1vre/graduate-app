import { UserRoles } from 'src/common/enums/user-roles.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('varchar', { length: 32, unique: true })
	login: string;

	@Column()
	password: string;

	@Column({ default: 4 })
	role: UserRoles;

	constructor(user: Partial<User>) {
		Object.assign(this, user);
	}
}
