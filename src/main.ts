import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

(async function () {
	const PORT = process.env.PORT || 3000;
	const app = await NestFactory.create(AppModule);
	(await app).listen(PORT, () =>
		console.log(`[START] PROJECT STARTED!!! -> http://localhost:${PORT}/`)
	);
})();
