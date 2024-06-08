import { Module } from '@nestjs/common';
import { DisciplinesController } from './disciplines.controller';
import { DisciplinesService } from './disciplines.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discipline } from './discipline.entity';
import { DisciplineForGroup } from './discipline-for-group.entity';
import { GroupsModule } from 'src/groups/groups.module';

@Module({
	imports: [TypeOrmModule.forFeature([Discipline, DisciplineForGroup]), GroupsModule],
	controllers: [DisciplinesController],
	providers: [DisciplinesService]
})
export class DisciplinesModule {}
