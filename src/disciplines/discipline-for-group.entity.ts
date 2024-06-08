import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'discipline-for-groups' })
export class DisciplineForGroup {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	group_code: number; 

	@Column()
	discipline_id: number;
	
	@Column()
	hours: number;

	constructor(disciplineForGroup: Partial<DisciplineForGroup>) {
		Object.assign(this, disciplineForGroup);
	}
}
