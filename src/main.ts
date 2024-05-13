import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';

(async function () {
	const PORT = process.env.PORT || 3000;
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.use(
		session({
			secret: 'l1vres-app',
			resave: false,
			saveUninitialized: false
		})
	);
	(await app).listen(PORT, () =>
		console.log(`[START] PROJECT STARTED!!! -> http://localhost:${PORT}/`)
	);
})();
