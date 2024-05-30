import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { GroupsModule } from './groups/groups.module';
import { Group } from './groups/group.entity';
import { Student } from './students/student.entity';
import { TeachersModule } from './teachers/teachers.module';
import { Teacher } from './teachers/teacher.entity';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: process.env.DB_HOST,
			database: process.env.DB_NAME,
			port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			entities: [User, Group, Student, Teacher],
			autoLoadEntities: true,
			synchronize: true
		}),
		AuthModule,
		UsersModule,
		StudentsModule,
		GroupsModule,
		TeachersModule
	]
})
export class AppModule {}
