import { Module, forwardRef } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { StudentsModule } from 'src/students/students.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Group]),
		forwardRef(() => StudentsModule)
	],
	controllers: [GroupsController],
	providers: [GroupsService],
	exports: [GroupsService]
})
export class GroupsModule {}
