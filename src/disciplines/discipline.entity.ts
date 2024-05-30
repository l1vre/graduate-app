import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'disciplines' })
export class Discipline {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	code: string;
	// пример 05.01
}
