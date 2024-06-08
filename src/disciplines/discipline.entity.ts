import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'disciplines' })
export class Discipline {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ unique: true })
	code: string;
	// пример 05.01

	groups?: number[];

	hours?: number[];

	constructor(discipline: Partial<Discipline>) {
		Object.assign(this, discipline);
	}
}
