import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'teachers' })
export class Teacher {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	full_name: string;

	@Column({ nullable: true, unique: true })
	user_id?: number;

	@Column({ nullable: true, unique: true })
	group_code?: number;

	constructor(student: Partial<Teacher>) {
		Object.assign(this, student);
	}
}
