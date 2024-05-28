import { Student } from 'src/students/student.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'groups' })
export class Group {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	code: number;

	students?: Student[]

	constructor(group: Partial<Group>) {
		Object.assign(this, group);
	}
}
