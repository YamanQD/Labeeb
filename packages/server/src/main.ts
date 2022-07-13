import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

	const config = new DocumentBuilder()
		.setTitle('Labeeb')
		.setDescription('The labeeb API description')
		.setVersion('1.0')
		.addTag('auth', 'Authentication (login/logout).')
		.addTag('tasks', 'The task resource.')
		.addTag('projects', 'The project resource.')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);

	await app.listen(4000);
}
bootstrap();
