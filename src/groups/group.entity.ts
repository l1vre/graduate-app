import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'groups' })
export class Group {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	code: number;

	constructor(group: Partial<Group>) {
		Object.assign(this, group);
	}
}
