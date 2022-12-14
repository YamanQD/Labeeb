import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
	app.enableCors();

	const config = new DocumentBuilder()
		.setTitle('Labeeb')
		.setDescription(
			'The official documentation of the best Task Management System in existence.',
		)
		.setVersion('1.0')
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			},
			'api_auth',
		)
		.addSecurityRequirements('api_auth')
		.addTag('auth', 'Authentication (login/logout).')
		.addTag('tasks', 'The task resource.')
		.addTag('projects', 'The project resource.')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);

	await app.listen(4000);
}
bootstrap();
