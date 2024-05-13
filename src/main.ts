import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

(async function () {
	const PORT = process.env.PORT || 3000;
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	(await app).listen(PORT, () =>
		console.log(`[START] PROJECT STARTED!!! -> http://localhost:${PORT}/`)
	);
})();
