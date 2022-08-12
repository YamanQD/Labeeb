import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailService } from './mail.service';

import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';

import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';

import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/task.entity';

import { List } from './lists/list.entity';
import { ListsModule } from './lists/lists.module';

import { ProjectsModule } from './projects/projects.module';
import { Project } from './projects/project.entity';
import { Status } from './projects/status.entity';
import { Tag } from './projects/tags.entity';
import { EncryptService } from './encrypt/encrypt.service';

@Module({
	imports: [
		ScheduleModule.forRoot(),
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
					entities: [User, Task, Project, List, Status, Tag],
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
		EncryptService,
	],
})
export class AppModule { }
