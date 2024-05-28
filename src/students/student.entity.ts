import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'students' })
export class Student {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	full_name: string;

	@Column({ type: 'date' })
	date_of_birth: string;

	@Column({ nullable: true })
	coursework?: string;

	@Column({ nullable: true })
	graduate_work?: string;

	@Column({ nullable: true })
	user_id?: number;

	@Column({ nullable: true })
	group_code?: number;

	constructor(student: Partial<Student>) {
		Object.assign(this, student);
	}
}
