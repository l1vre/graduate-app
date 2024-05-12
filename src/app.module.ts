import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
			entities: [],
			autoLoadEntities: true,
			synchronize: true
		})
	]
})
export class AppModule {}
