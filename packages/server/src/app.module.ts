import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/task.entity';
import { ProjectsModule } from './projects/projects.module';
import { Project } from './projects/project.entity';
import { List } from './lists/list.entity';
import { ListsModule } from './lists/lists.module';
import { MailService } from './mail.service';

@Module({
	imports: [
		UsersModule,
		AuthModule,
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => {
				return {
					type: 'mariadb',
					host: configService.get<string>('DATABASE_HOST'),
					port: configService.get<number>('DATABASE_PORT'),
					username: configService.get<string>('DATABASE_USERNAME'),
					password: configService.get<string>('DATABASE_PASSWORD'),
					database: configService.get<string>('DATABASE_NAME'),
					entities: [User, Task, Project, List],
					synchronize: true, //! DO NOT USE IN PRODUCTION
				};
			},
			inject: [ConfigService],
		}),
		TasksModule,
		ProjectsModule,
		ListsModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		MailService,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
	],
})
export class AppModule {}
