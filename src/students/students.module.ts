import { Module, forwardRef } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { UsersModule } from 'src/users/users.module';
import { GroupsModule } from 'src/groups/groups.module';
@Module({
	imports: [
		TypeOrmModule.forFeature([Student]),
		UsersModule,
		forwardRef(() => GroupsModule)
	],
	controllers: [StudentsController],
	providers: [StudentsService],
	exports: [StudentsService]
})
export class StudentsModule {}
