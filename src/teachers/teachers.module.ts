import { Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { GroupsModule } from 'src/groups/groups.module';

@Module({
	imports: [TypeOrmModule.forFeature([Teacher]), GroupsModule],
	controllers: [TeachersController],
	providers: [TeachersService]
})
export class TeachersModule {}
