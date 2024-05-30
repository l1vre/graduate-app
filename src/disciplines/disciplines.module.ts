import { Module } from '@nestjs/common';
import { DisciplinesController } from './disciplines.controller';
import { DisciplinesService } from './disciplines.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discipline } from './discipline.entity';

@Module({
	exports: [TypeOrmModule.forFeature([Discipline])],
	controllers: [DisciplinesController],
	providers: [DisciplinesService]
})
export class DisciplinesModule {}
